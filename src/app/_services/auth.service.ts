import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import * as hash from "hash.js";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../_interfaces/user.interface";
import {Game} from "../_interfaces/game.interface";
import {Pagination} from "../_interfaces/pagination.interface";
import {BehaviorSubject, Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User;

  constructor(private httpClient: HttpClient) {
    if (this.isLoggedIn) {
      this.getUserInfo().then(value => {
        this.user = value;
      })
    }
  }

  get isLoggedIn() {
    return localStorage.getItem('oauth_token') != null && localStorage.getItem('refresh_token') != null;
  }

  public logout() {
    this.user = null;
    localStorage.removeItem('oauth_token');
    localStorage.removeItem('refresh_token');
  }

  public async getAuthUrl(): Promise<string> {
    const url = environment.OAUTH_URL;

    const state = AuthService.random_string(40, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
    localStorage.setItem('oauth_state', state);

    const code_verifier = AuthService.random_string(128);
    localStorage.setItem('oauth_code_verifier', code_verifier);

    const code_challenge = await AuthService.generateCodeChallenge(code_verifier);
    localStorage.setItem('oauth_code_challenge', code_challenge);

    console.log(code_verifier);
    console.log(code_challenge);

    const client_id = environment.OAUTH_PUBLIC_KEY;
    const redirect_uri = encodeURIComponent(`${environment.APP_URL}/oauth/callback`);
    const response_type = 'code';
    const scope = '*';

    const code_challenge_method = 'S256';

    return `${url}/authorize?state=${state}&client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&code_challenge=${code_challenge}&code_challenge_method=${code_challenge_method}`;
  }

  public async getTokenFromAuthorizationCode(authorization_code: string): Promise<User | void> {
    const code_verifier = localStorage.getItem('oauth_code_verifier');

    return await this.httpClient.post<User>(`${environment.OAUTH_URL}/token`, {
      'grant_type': 'authorization_code',
      'client_id': environment.OAUTH_PUBLIC_KEY,
      'redirect_uri': `${environment.APP_URL}/oauth/callback`,
      'code_verifier': code_verifier,
      'code': authorization_code,
    }).toPromise()
      .then(async (value: any) => {
        localStorage.removeItem('oauth_code_verifier');
        localStorage.removeItem('oauth_code_challenge');

        localStorage.setItem('oauth_token', value.access_token);
        localStorage.setItem('refresh_token', value.refresh_token);

        return await this.getUserInfo().then((u: User) => {
          this.user = u;
          return u;
        })
      })
      .catch(reason => {
        window.alert("Er ging iets fout met het inlogproces");
      });
  }

  public getUserInfo(): Promise<User> {
    return this.httpClient.get<User>(`${environment.API_URL}/user`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${localStorage.getItem('oauth_token')}`
      })
    }).toPromise()
  }

  private static async generateCodeChallenge(codeVerifier) {
    const digest = await crypto.subtle.digest("SHA-256",
      new TextEncoder().encode(codeVerifier));

    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  }

  private static random_string(length: number, chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~") {
    let result = '';

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }

  public getAuthToken() {
    return localStorage.getItem("oauth_token");
  }
}
