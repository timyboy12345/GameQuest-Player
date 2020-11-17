import { Player } from './player.interface';

export interface Game {
  id: string;
  type: string;
  creator_id?: string;
  data?: {
    name: string
  };
  state: string;
  code: string;
  players?: Player[];

  created_at?: string;
  updated_at?: string;
  started_at?: string;
}
