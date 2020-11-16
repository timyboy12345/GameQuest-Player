import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() title?: string;
  @Input() margin: string = "mb-8";
  @Input() padding: string = "p-4";
  @Input() card_classes?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
