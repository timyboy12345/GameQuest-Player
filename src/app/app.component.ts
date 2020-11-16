import { Component } from '@angular/core';
import {AuthService} from "./_services/auth.service";
import {User} from "./_interfaces/user.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public user: User;

  title = 'GameQuest-Player';
  public navMenuExpanded: boolean = true;

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
