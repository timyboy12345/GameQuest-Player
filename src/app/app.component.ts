import {Component} from '@angular/core';
import {AuthService} from "./_services/auth.service";
import {User} from "./_interfaces/user.interface";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({opacity: 0}),
            animate('0.1s ease-out',
              style({opacity: 1}))
          ]
        ),
        transition(
          ':leave',
          [
            style({opacity: 1}),
            animate('0.1s ease-in',
              style({opacity: 0}))
          ]
        )
      ]
    )
  ]
})
export class AppComponent {
  public user: User;

  title = 'GameQuest-Player';
  public navMenuExpanded: boolean = false;

  constructor(public authService: AuthService) {
    this.user = authService.user;
  }

  public logout() {
    this.authService.logout();
    this.navMenuExpanded = false;
  }

  public async login() {
    window.location.href = await this.authService.getAuthUrl();
    this.navMenuExpanded = false;
  }
}
