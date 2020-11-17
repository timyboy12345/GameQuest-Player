import { Component, Input, OnInit } from '@angular/core';
import { BardsGame } from '../../../_interfaces/bards_game.interface';

@Component({
  selector: 'app-ending',
  templateUrl: './ending.component.html',
  styleUrls: ['./ending.component.scss']
})
export class EndingComponent implements OnInit {
  @Input() game: BardsGame;

  constructor() { }

  ngOnInit(): void {
  }

}
