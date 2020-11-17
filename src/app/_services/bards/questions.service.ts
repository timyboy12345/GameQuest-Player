import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BardsGame } from '../../_interfaces/bards_game.interface';
import { BardsQuestion } from '../../_interfaces/bards_question.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private httpClient: HttpClient) {
  }

  public getQuestions(gameId: string): Promise<BardsQuestion[]> {
    return this.httpClient
      .get<BardsQuestion[]>(`${environment.API_URL}/games/game/${gameId}/questions`)
      .toPromise();
  }

  public saveQuestions(gameId: string, questions: BardsQuestion[]): Promise<any> {
    return this.httpClient
      .put(`${environment.API_URL}/games/game/${gameId}/bards/questions`, {questions})
      .toPromise();
  }
}
