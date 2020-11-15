import {Component, OnInit} from '@angular/core';
import {BardsGame} from "../../_interfaces/bards.interface";
import {ListenerService, MessageTypes} from "../../_services/bards/listener.service";
import {GameService} from "../../_services/game.service";
import {QuestionService} from "../../_services/bards/question.service";
import {QuestionsService} from "../../_services/bards/questions.service";
import {BardQuestionType, BoardQuestionGroupType} from "../../_interfaces/bards_question.interface";
import {BardsPlayer} from "../../_interfaces/bards_player.interface";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {
  public game?: BardsGame;
  public readonly min_player_count = environment.BARDS_MIN_PLAYER_COUNT;

  private game_id: string = "2ab576f5-7420-3272-ae92-a0577f80c45b";
  public error: any;

  constructor(public listenerService: ListenerService,
              private gameService: GameService,
              private questionService: QuestionService,
              private questionsService: QuestionsService) {
  }

  ngOnInit(): void {
    this.gameService.get(this.game_id)
      .then((value: BardsGame) => {
        this.game = value;

        this.listenerService.subscribe(this.game.id);
        this.listenerService.listen().subscribe(m => {
          console.log(m.message);

          if (m.message.type == MessageTypes.PLAYER_JOINED) {
            this.playerJoined(m.message.player);
          }
        })
      })
      .catch(reason => {
        console.error(reason);
        reason.i18_message = "Er ging iets fout bij het ophalen van het spel";
        reason.i18_description = "Het zou kunnen dat onze server wordt geupdate, maar het zou ook kunnen dat jij geen internet hebt.";
        this.error = reason;
      })
  }

  public playerJoined(player: BardsPlayer) {
    this.game.players.push(player);
  }

  public startGame() {
    if (this.game.players && this.game.players.length >= this.min_player_count) {
      this.game.state = "starting";

      const questions = this.questionService.get(this.game.players.length * 3);

      this.questionsService.saveQuestions(this.game.id, questions).then(() => {
        this.game.data.questions = questions;

        window.setTimeout(() => {
          this.game.state = "playing";
        }, 1000);
      });
    }
  }
}
