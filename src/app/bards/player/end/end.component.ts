import { Component, Input, OnInit } from '@angular/core';
import { BardsGame } from '../../../_interfaces/bards_game.interface';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {
  @Input() game: BardsGame;

  constructor() { }

  ngOnInit(): void {
  }

}
