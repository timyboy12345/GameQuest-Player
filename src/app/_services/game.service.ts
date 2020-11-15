import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) {
  }

  public get(game_id: string): Promise<Object> {
    return this.httpClient.get(`${environment.API_URL}/games/game/${game_id}`).toPromise();
  }

  public getByCode(code: string): Promise<Object> {
    return this.httpClient.get(`${environment.API_URL}/games/code/${code}`).toPromise();
  }
}
