export interface Game {
  id: string;
  type: string;
  creator_id?: string;
  data: {
    name: string
  };
  state: string;
  code: string;
  players: [];

  created_at: string;
  updated_at: string;
  started_at: string;
}
