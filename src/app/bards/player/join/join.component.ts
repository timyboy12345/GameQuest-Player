import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BardsGame} from "../../../_interfaces/bards.interface";
import {ListenerService} from "../../../_services/bards/listener.service";
import {GameService} from "../../../_services/game.service";
import * as uuid from 'uuid';
import {BardsPlayer} from "../../../_interfaces/bards_player.interface";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  @Input() game: BardsGame;
  @Input() player: BardsPlayer;

  joinForm: FormGroup;

  constructor(
    private listenerService: ListenerService,
    private gameService: GameService
  ) {
  }

  ngOnInit(): void {
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
  }

  public submit() {
    if (!this.joinForm.valid) {
      console.log("Form is not valid");
      return;
    }

    this.joinForm.disable();

    this.gameService.getByCode(this.joinForm.get('code').value)
      .then((game: BardsGame) => {
        const player: BardsPlayer = {
          id: uuid.v4(),
          name: this.joinForm.get('name').value
        };

        this.listenerService.playerJoined(player, game.id).then(() => {
          this.game.id = game.id;
          this.game.state = game.state;
          this.game.code = game.code;
          this.game.creator_id = game.creator_id;
          this.game.data = game.data;

          this.player.id = player.id;
          this.player.name = player.name;

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
