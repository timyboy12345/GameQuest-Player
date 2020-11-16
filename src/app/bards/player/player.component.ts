import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ListenerService, MessageTypes} from "../../_services/bards/listener.service";
import {BardsPlayer} from "../../_interfaces/bards_player.interface";
import {BardsQuestion, BoardQuestionGroupType} from "../../_interfaces/bards_question.interface";
import {BardsGame} from "../../_interfaces/bards.interface";
import {GameService} from "../../_services/game.service";
import {Game} from "../../_interfaces/game.interface";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  public player: BardsPlayer;
  public game: BardsGame;

  public cachedGame: Game;
  public cachedPlayer: BardsPlayer;

  public canJoinGame: boolean;

  public question: BardsQuestion;

  constructor(
    private router: Router,
    private listenerService: ListenerService,
    private gameService: GameService,
    private activatedRoute: ActivatedRoute
  ) {
    this.game = {
      id: null, players: [], type: ""
    };

    this.player = {
      id: null, name: null
    };
  }

  ngOnInit(): void {
    const cachedGame = this.gameService.getCachedGame();
    const cachedPlayer = this.gameService.getCachedPlayer();

    const route = this.activatedRoute.snapshot.queryParamMap;

    // Let player choose whether to resume the game when a cached game and player were
    // found, also the cached game has to be of type 'bards'.
    if (cachedGame && cachedPlayer && cachedGame.type == 'bards') {
      this.cachedGame = cachedGame;
      this.cachedPlayer = <BardsPlayer>cachedPlayer;

      this.canJoinGame = true;
      return;
    }

    this.canJoinGame = true;
    this.startListening();
  }

  public resumeCachedGame() {
    const cachedPlayer = this.cachedPlayer;
    const cachedGame = this.cachedGame;

    this.gameService.get(cachedGame.id)
      .then((game) => {
        if (game.state != 'queue' && game.state != 'starting' && game.state != 'playing') {
          this.canJoinGame = true;
          this.cachedGame = null;
          this.cachedPlayer = null;
          return;
        }

        this.listenerService.playerJoined(cachedPlayer, game.id).then(() => {
          this.game = <BardsGame><unknown>game;
          this.player = cachedPlayer;

          this.startListening();
          this.listenerService.subscribe(game.id);
        });
      })
      .catch(() => {
        this.canJoinGame = true;
        this.startListening();
      })
  }

  public startListening() {
    this.listenerService.listen().subscribe(value => {
      console.log(value);

      if (value.message.type == MessageTypes.NEW_QUESTION) {
        this.question = null;

        if ((value.message.player && value.message.player.id == this.player.id) || (<BardsQuestion>value.message.question).groupType == BoardQuestionGroupType.GROUP) {
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

  public madeChoice(choice: string) {
    if (choice == 'resume') {
      this.resumeCachedGame();
      this.cachedPlayer = null;
      this.cachedGame = null;
      this.canJoinGame = false;
    } else {
      this.cachedPlayer = null;
      this.cachedGame = null;
      this.canJoinGame = true;
    }
  }
}
