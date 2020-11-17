import { Component, Input, OnInit } from '@angular/core';
import { BardsGame } from '../../../_interfaces/bards_game.interface';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
  @Input() game: BardsGame;
  public APP_URL: string = environment.APP_URL;

  public get gameUrl(): string {
    return this.game ? `${environment.APP_URL}/bards/player/?game_code=${this.game.code}` : null;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
