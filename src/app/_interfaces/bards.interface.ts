import {BardsPlayer} from "./bards_player.interface";
import {BardsQuestion} from "./bards_question.interface";

export interface BardsGame {
  id: string;
  type: string;
  creator_id?: string;
  data?: {
    questions: BardsQuestion[];
    name?: string;
  };
  players: BardsPlayer[];
  code?: string;
  state?: string;
}
