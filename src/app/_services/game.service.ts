import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Game } from '../_interfaces/game.interface';
import { AuthService } from './auth.service';
import { Pagination } from '../_interfaces/pagination.interface';
import { Player } from '../_interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // Set the maximum time a game can be cached to 20 minutes
  private maxSessionStorageInSeconds = 60 * 20;

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  public get(gameId: string): Promise<Game> {
    return this.httpClient.get<Game>(`${environment.API_URL}/games/game/${gameId}`).toPromise();
  }

  public getByCode(code: string): Promise<Game> {
    return this.httpClient.get<Game>(`${environment.API_URL}/games/code/${code}`).toPromise();
  }

  public getUserGames(order: string = 'desc'): Promise<Pagination<Game>> {
    return this.httpClient.get<Pagination<Game>>(`${environment.API_URL}/games?order=${order}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('oauth_token')}`
      })
    }).toPromise();
  }

  public create(params: { type: string }): Promise<Game> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getAuthToken()}`
    });

    return this.httpClient.post<Game>(`${environment.API_URL}/games/game`, params, {
      headers
    }).toPromise();
  }

  public getCachedGame(): Game {
    if (sessionStorage.getItem('cached_game_timestamp')) {
      const unixSeconds = Math.floor(Date.now() / 1000);
      const savedUnixSeconds: number = parseInt(sessionStorage.getItem('cached_game_timestamp'), 10);

      if (unixSeconds > savedUnixSeconds + this.maxSessionStorageInSeconds) {
        sessionStorage.setItem('cached_game_timestamp', null);
        sessionStorage.setItem('cached_game', null);
        return null;
      }
    }

    return sessionStorage.getItem('cached_game') ? JSON.parse(sessionStorage.getItem('cached_game')) : null;
  }

  public saveGameInCache(game: Game): void {
    const unixSeconds = Math.floor(Date.now() / 1000);
    sessionStorage.setItem('cached_game_timestamp', unixSeconds.toString());
    sessionStorage.setItem('cached_game', JSON.stringify(game));
  }

  public getCachedPlayer(): Player {
    if (sessionStorage.getItem('cached_player_timestamp')) {
      const unixSeconds = Math.floor(Date.now() / 1000);
      const savedUnixSeconds: number = parseInt(sessionStorage.getItem('cached_player_timestamp'), 10);

      if (unixSeconds > savedUnixSeconds + this.maxSessionStorageInSeconds) {
        sessionStorage.setItem('cached_player_timestamp', null);
        sessionStorage.setItem('cached_player', null);
        return null;
      }
    }

    return sessionStorage.getItem('cached_player') ? JSON.parse(sessionStorage.getItem('cached_player')) : null;
  }

  public savePlayerInCache(player: Player): void {
    const unixSeconds = Math.floor(Date.now() / 1000);
    sessionStorage.setItem('cached_player_timestamp', unixSeconds.toString());
    sessionStorage.setItem('cached_player', JSON.stringify(player));
  }
}
