import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BardsGame} from "../../../_interfaces/bards_game.interface";
import {ListenerService} from "../../../_services/bards/listener.service";
import {GameService} from "../../../_services/game.service";
import * as uuid from 'uuid';
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {AuthService} from "../../../_services/auth.service";
import {Game} from "../../../_interfaces/game.interface";
import {Player} from "../../../_interfaces/player.interface";

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  @Input() game: BardsGame;
  @Input() player: Player;

  joinForm: FormGroup;

  constructor(
    private listenerService: ListenerService,
    private gameService: GameService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    const params: ParamMap = this.activatedRoute.snapshot.queryParamMap;

    this.joinForm = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(5)
      ]),
      name: new FormControl('', [
        Validators.required
      ])
    })

    if (params.has('game_code')) {
      this.joinForm.get('code').setValue(params.get('game_code'));
    }

    if (this.authService.isLoggedIn && this.authService.user) {
      this.joinForm.get('name').setValue(this.authService.user.name);
    }
  }

  public submit() {
    if (!this.joinForm.valid) {
      console.log("Form is not valid");
      return;
    }

    this.joinForm.disable();

    this.gameService.getByCode(this.joinForm.get('code').value)
      .then((game: BardsGame) => {
        const player: Player = {
          id: uuid.v4(),
          name: this.joinForm.get('name').value
        };

        this.listenerService.playerJoined(player, game.id).then(() => {
          this.game.id = game.id;
          this.game.state = game.state;
          this.game.code = game.code;
          this.game.creator_id = game.creator_id;
          this.game.data = game.data;
          this.game.type = game.type;

          this.player.id = player.id;
          this.player.name = player.name;

          this.gameService.saveGameInCache(<Game><unknown>this.game);
          this.gameService.savePlayerInCache(this.player);

          this.listenerService.subscribe(this.game.id);
          this.listenerService.setPlayerUuid(this.player.id);
        })
      })
      .catch((e: HttpErrorResponse) => {
        this.joinForm.enable();
        window.alert(e.message);
      });
  }
}
