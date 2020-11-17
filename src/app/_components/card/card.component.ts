import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardTitle?: string;
  @Input() margin = 'mb-8';
  @Input() padding = 'p-4';
  @Input() card_classes?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
