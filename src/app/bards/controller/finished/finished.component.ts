import {Component, Input, OnInit} from '@angular/core';
import {BardsGame} from "../../../_interfaces/bards_game.interface";

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss']
})
export class FinishedComponent implements OnInit {
  @Input() game: BardsGame;

  constructor() { }

  ngOnInit(): void {
  }

}
