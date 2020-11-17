import { BardsQuestion } from './bards_question.interface';
import { Player } from './player.interface';

export interface BardsGame {
  id: string;
  type: string;
  creator_id?: string;
  data?: {
    questions?: BardsQuestion[];
    name?: string;
  };
  state: string;
  code: string;
  players?: Player[];

  created_at?: string;
  updated_at?: string;
  started_at?: string;
}
