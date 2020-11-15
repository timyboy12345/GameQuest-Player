export interface BardsQuestion {
  type: BardQuestionType;
  groupType: BoardQuestionGroupType;
  public: boolean;
  question: string;
  deviceQuestion?: string;
}

export enum BoardQuestionGroupType {
  PLAYER = "player",
  INDIVIDUAL = "individual",
  GROUP = "group",
}

export enum BardQuestionType {
  RED = "red",
  BLACK = "black",
}
