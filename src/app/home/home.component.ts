import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {Game} from "../_interfaces/game.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public bardsGameId: string = "";
  public games: Game[];

  constructor(
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.authService.getUserGames().then((value) => {
        this.games = value.data;
      })
    }
  }

  public async login() {
    const url = await this.authService.getAuthUrl();
    console.log(url);
    window.location.href = url;
  }
}
