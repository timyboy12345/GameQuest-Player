import {Component, Input, OnInit} from '@angular/core';
import {BardsGame} from "../../../_interfaces/bards.interface";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
  @Input() game: BardsGame;

  public get gameUrl() {
    return this.game ? `${environment.APP_URL}/${this.game.code}` : null;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
