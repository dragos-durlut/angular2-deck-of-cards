import { CardResponse } from './card-response';

export interface DeckResponse {
  success: boolean;
  cards: CardResponse[] | null;
  deck_id: string;
  shuffled: boolean | null;
  remaining: number;
  error: string | null;
}
