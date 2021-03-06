import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ListenerService, MessageTypes} from "../../_services/bards/listener.service";
import {BardsPlayer} from "../../_interfaces/bards_player.interface";
import {BardsQuestion} from "../../_interfaces/bards_question.interface";
import {BardsGame} from "../../_interfaces/bards.interface";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  public player: BardsPlayer;
  public game: BardsGame;

  public question: BardsQuestion;

  constructor(
    private router: Router,
    private listenerService: ListenerService
  ) {
    this.game = {
      id: null, players: [], type: ""
    };

    this.player = {
      id: null, name: null
    };
  }

  ngOnInit(): void {
    this.listenerService.listen().subscribe(value => {
      console.log(value);

      if (value.message.type == MessageTypes.NEW_QUESTION) {
        this.question = null;

        if (value.message.player.id == this.player.id) {
          this.question = value.message.question;
        }
      }

      if (value.message.type == MessageTypes.GAME_STARTED) {
        this.question = null;
        this.game.state = 'playing';
      }

      if (value.message.type == MessageTypes.GAME_ENDED) {
        this.question = null;
        this.game.state = 'ended';
      }
    })
  }

  public leaveGame(): void {
    this.router.navigate(["home"]);
  }
}
