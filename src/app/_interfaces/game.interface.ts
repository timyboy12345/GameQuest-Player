export interface Game {
  id: string;
  type: string;
  creator_id: string;
  state: string;
  code: string;
  players: [];
  data: {
    name: string
  };
  created_at: string;
  updated_at: string;
  started_at: string;
}
