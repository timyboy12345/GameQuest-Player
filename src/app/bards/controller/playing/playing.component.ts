import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BardsGame} from "../../../_interfaces/bards_game.interface";
import {BardsQuestion} from "../../../_interfaces/bards_question.interface";
import {Player} from "../../../_interfaces/player.interface";
import {ListenerService} from "../../../_services/bards/listener.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.scss']
})
export class PlayingComponent implements OnInit, OnDestroy {
  @Input() game: BardsGame;

  @Output() gameStateChanged = new EventEmitter();

  private subscriptions: Subscription[] = [];

  public selectedPlayerIndex: number = -1;
  public selectedQuestionIndex: number = -1;

  get selectedQuestion(): BardsQuestion {
    return this.game.data.questions[this.selectedQuestionIndex];
  }

  get selectedPlayer(): Player {
    return this.game.players[this.selectedPlayerIndex];
  }

  get questionType() {
    return this.selectedQuestion.type.toString();
  }

  get questionGroupType() {
    return this.selectedQuestion.groupType.toString();
  }

  constructor(
    private listenerService: ListenerService
  ) {
  }

  ngOnInit(): void {
    const s = this.listenerService.listen().subscribe(m => {
      // if (m.message.type == MessageTypes.NEW_QUESTION) {
      //   console.log(m);
      // }
    })

    this.subscriptions.push(s);

    this.nextQuestion();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    })
  }

  public nextQuestion() {
    if (this.selectedQuestionIndex >= 0 && this.selectedQuestionIndex >= this.game.data.questions.length - 1) {
      return;
    }

    this.selectedPlayerIndex = Math.floor(Math.random() * this.game.players.length);

    this.selectedQuestionIndex += 1;

    this.listenerService.sendQuestion(this.selectedPlayer, this.selectedQuestion, this.game.id);
  }

  public endGame() {
    this.listenerService.endGame(this.game.id).then(value => {
      this.gameStateChanged.emit("ending");
    });
  }
}
