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

  constructor(public authService: AuthService) {
    this.user = authService.user;
  }

  title = 'GameQuest-Player';
}
