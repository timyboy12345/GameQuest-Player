import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Game} from "../_interfaces/game.interface";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  public get(game_id: string): Promise<Object> {
    return this.httpClient.get(`${environment.API_URL}/games/game/${game_id}`).toPromise();
  }

  public getByCode(code: string): Promise<Object> {
    return this.httpClient.get(`${environment.API_URL}/games/code/${code}`).toPromise();
  }

  public create(params: { type: string }): Promise<Game> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getAuthToken()}`
    });

    return this.httpClient.post<Game>(`${environment.API_URL}/games/game`, params, {
      headers: headers
    }).toPromise();
  }
}
