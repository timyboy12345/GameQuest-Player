import {Component, Input, OnInit} from '@angular/core';
import {BardsGame} from "../../../_interfaces/bards.interface";

@Component({
  selector: 'app-starting',
  templateUrl: './starting.component.html',
  styleUrls: ['./starting.component.scss']
})
export class StartingComponent implements OnInit {
  @Input() game: BardsGame;

  constructor() { }

  ngOnInit(): void {
  }

}
