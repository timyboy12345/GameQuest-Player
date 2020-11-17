import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../../../_interfaces/game.interface';
import { Player } from '../../../_interfaces/player.interface';

@Component({
  selector: 'app-cached-game',
  templateUrl: './cached-game.component.html',
  styleUrls: ['./cached-game.component.scss']
})
export class CachedGameComponent implements OnInit {
  @Input() cachedGame: Game;
  @Input() cachedPlayer: Player;

  @Output() madeChoice = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public choose(choice: string): void {
    this.madeChoice.emit(choice);
  }
}
