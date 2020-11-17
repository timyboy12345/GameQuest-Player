import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Game } from '../_interfaces/game.interface';
import { GameService } from '../_services/game.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public games: Game[];
  public startNewGamePopup = false;
  public creatingGame = false;

  constructor(
    public authService: AuthService,
    private gameService: GameService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getGames();
  }

  private getGames(): void {
    if (this.authService.isLoggedIn) {
      this.gameService.getUserGames().then((value) => {
        this.games = value.data;
      });
    }
  }

  public async login(): Promise<void> {
    const url = await this.authService.getAuthUrl();
    console.log(url);
    window.location.href = url;
  }

  public async newGame(gameType: string): Promise<void> {
    if (this.creatingGame) {
      return;
    }

    this.creatingGame = true;
    this.gameService.create({
      type: gameType
    }).then(game => {
      console.log(game);
      this.router.navigate(['/', gameType, 'controller', game.id]);
    }).catch((reason: HttpErrorResponse) => {
      console.log(reason);
    }).then(() => {
      this.creatingGame = false;
    });
  }

  public joinGame(code: string): Promise<void> {
    return this.gameService.getByCode(code)
      .then((game: Game) => {
        if (game.type === 'autocomplete') {
          window.alert(`Dit speltype (${game.type}) wordt nog niet ondersteund door deze website.`);
          return;
        }

        this.router.navigate(['/', game.type, 'player'], {queryParams: {game_code: game.code}});
      })
      .catch((reason: HttpErrorResponse) => {
        console.log(reason);

        switch (reason.status) {
          case 404:
            window.alert('Er is geen spel gevonden met deze code');
            break;
          default:
            window.alert('Er ging iets fout bij het ophalen');
            break;
        }
      });
  }
}
