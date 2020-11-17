import { Component, Input, OnInit } from '@angular/core';
import { BardsQuestion } from '../../../_interfaces/bards_question.interface';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: BardsQuestion;

  constructor() { }

  ngOnInit(): void {
  }

}
