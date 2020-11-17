import { Component, OnInit } from '@angular/core';
import { BardsGame } from '../../_interfaces/bards_game.interface';
import { ListenerService, MessageTypes } from '../../_services/bards/listener.service';
import { GameService } from '../../_services/game.service';
import { QuestionService } from '../../_services/bards/question.service';
import { QuestionsService } from '../../_services/bards/questions.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Game } from '../../_interfaces/game.interface';
import { Player } from '../../_interfaces/player.interface';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {
  public game?: BardsGame;
  public readonly minPlayerCount: number = environment.BARDS_MIN_PLAYER_COUNT;

  public error: any;

  constructor(public listenerService: ListenerService,
              private gameService: GameService,
              private questionService: QuestionService,
              private questionsService: QuestionsService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const gameId = this.activatedRoute.snapshot.paramMap.get('game_id');

    this.gameService.get(gameId)
      .then((value: Game) => {
        this.game = (value as unknown as BardsGame);

        this.listenerService.subscribe(this.game.id);
        this.listenerService.listen().subscribe(m => {
          console.log(m.message);

          if (m.message.type === MessageTypes.PLAYER_JOINED) {
            this.playerJoined(m.message.player);
          }
        });
      })
      .catch((reason: HttpErrorResponse) => {
        console.error(reason);
        const obj: any = reason;

        if (reason.status === 404) {
          obj.i18_message = 'Spel niet gevonden';
          obj.i18_description = 'Er zijn geen spellen met dit ID gevonden.';
        } else {
          obj.i18_message = 'Er ging iets fout bij het ophalen van het spel';
          obj.i18_description = 'Het zou kunnen dat onze server wordt geupdate, maar het zou ook kunnen dat jij geen internet hebt.';
        }

        this.error = obj;
      });
  }

  public playerJoined(player: Player): void {
    let playerAlreadyJoined = false;

    this.game.players.forEach(p => {
      if (p.id === player.id) {
        playerAlreadyJoined = true;
      }
    });

    if (!playerAlreadyJoined) {
      this.game.players.push(player);
    }
  }

  public startGame(): void {
    if (this.game.players && this.game.players.length >= this.minPlayerCount) {
      this.game.state = 'starting';

      this.listenerService.startGame(this.game.id);

      const questions = this.questionService.get(this.game.players.length * 3);

      this.questionsService.saveQuestions(this.game.id, questions).then(() => {
        this.game.data.questions = questions;

        window.setTimeout(() => {
          this.game.state = 'playing';
        }, 1000);
      });
    }
  }

  public gameStateChanged($event: any): void {
    switch ($event) {
      case 'ending':
        this.endGame();
        break;
    }
  }

  private endGame(): void {
    this.game.state = 'ending';

    window.setTimeout(() => {
      this.game.state = 'ended';
    }, 1000);
  }
}
