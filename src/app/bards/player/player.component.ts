import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListenerService, MessageTypes } from '../../_services/bards/listener.service';
import { BardsQuestion, BoardQuestionGroupType } from '../../_interfaces/bards_question.interface';
import { BardsGame } from '../../_interfaces/bards_game.interface';
import { GameService } from '../../_services/game.service';
import { Game } from '../../_interfaces/game.interface';
import { Player } from '../../_interfaces/player.interface';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  public player: Player;
  public game: BardsGame;

  public cachedGame: Game;
  public cachedPlayer: Player;

  public canJoinGame: boolean;

  public question: BardsQuestion;

  constructor(
    private router: Router,
    private listenerService: ListenerService,
    private gameService: GameService,
    private activatedRoute: ActivatedRoute
  ) {
    this.game = {
      id: null, players: [], type: '', state: 'join', code: null
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
    if (cachedGame && cachedPlayer && cachedGame.type === 'bards') {
      // Get the game from the API to check the state
      this.gameService.get(cachedGame.id).then(g => {
        if (g.state !== 'ended') {
          this.cachedGame = cachedGame;
          this.cachedPlayer = (cachedPlayer as Player);

          this.canJoinGame = true;
        } else {
          this.canJoinGame = true;
          this.startListening();
        }
      });

      return;
    }

    this.canJoinGame = true;
    this.startListening();
  }

  public resumeCachedGame(): void {
    const cachedPlayer = this.cachedPlayer;
    const cachedGame = this.cachedGame;

    this.gameService.get(cachedGame.id)
      .then((game) => {
        if (game.state !== 'queue' && game.state !== 'starting' && game.state !== 'playing') {
          this.canJoinGame = true;
          this.cachedGame = null;
          this.cachedPlayer = null;
          return;
        }

        this.listenerService.playerJoined(cachedPlayer, game.id).then(() => {
          this.game = (game as unknown as BardsGame);
          this.player = cachedPlayer;

          this.startListening();
          this.listenerService.subscribe(game.id);
        });
      })
      .catch(() => {
        this.canJoinGame = true;
        this.startListening();
      });
  }

  public startListening(): void {
    this.listenerService.listen().subscribe(value => {
      console.log(value);

      if (value.message.type === MessageTypes.NEW_QUESTION) {
        this.question = null;

        if ((value.message.player && value.message.player.id === this.player.id) || (value.message.question as BardsQuestion).groupType === BoardQuestionGroupType.GROUP) {
          this.question = value.message.question;
        }
      }

      if (value.message.type === MessageTypes.GAME_STARTED) {
        this.question = null;
        this.game.state = 'playing';
      }

      if (value.message.type === MessageTypes.GAME_ENDED) {
        this.question = null;
        this.game.state = 'ended';
      }
    });
  }

  public leaveGame(): void {
    // this.router.navigate(["home"]);
  }

  public madeChoice(choice: string): void {
    if (choice === 'resume') {
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
