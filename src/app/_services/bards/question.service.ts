import {Injectable} from '@angular/core';
import {BardQuestionType, BardsQuestion, BoardQuestionGroupType} from "../../_interfaces/bards_question.interface";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questions: BardsQuestion[];

  constructor() {
    this.questions = [
      {
        question: "Someone has to drink",
        deviceQuestion: "Choose someone that has to drink",
        type: BardQuestionType.BLACK,
        groupType: BoardQuestionGroupType.INDIVIDUAL,
        public: true
      },
      {
        question: "You have to drink",
        deviceQuestion: "Sorry, you're drinking",
        type: BardQuestionType.BLACK,
        groupType: BoardQuestionGroupType.PLAYER,
        public: false
      },
      {
        question: "All woman have to drink",
        type: BardQuestionType.BLACK,
        groupType: BoardQuestionGroupType.GROUP,
        public: true
      },
      {
        question: "All men have to drink",
        type: BardQuestionType.BLACK,
        groupType: BoardQuestionGroupType.GROUP,
        public: true
      },
      {
        question: "All blond people have to drink",
        type: BardQuestionType.BLACK,
        groupType: BoardQuestionGroupType.GROUP,
        public: true
      },
      {
        question: "Do you have blue pants? You drink!",
        type: BardQuestionType.BLACK,
        groupType: BoardQuestionGroupType.GROUP,
        public: true
      },
      {
        question: "Truth or dare, or chicken out",
        type: BardQuestionType.RED,
        public: true,
        groupType: BoardQuestionGroupType.PLAYER
      }
    ]
  }

  public get(amount: number): BardsQuestion[] {
    return this.getRandom(amount);
  }

  public getOne(): BardsQuestion {
    return this.get(1)[0];
  }

  private getRandom(n, arr = this.questions): BardsQuestion[] {
    let result = new Array(n),
      len = arr.length,
      taken = new Array(len);

    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");

    while (n--) {
      const x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }

    return result;
  }
}
