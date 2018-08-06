import {Achievement} from './achievement';

export class PlayerMatch {
  name: string;
  avatar: string;
  id: string;
  user_info_id: string;
  number: number;
  positions: string[];
  nationality: string;
  goals: number[];
  assists: number[];
  yellow_cards: number[];
  red_cards: number[];
  minutes_played: number;
  go_in:number[];
  go_out:number[];
  achievements: Achievement[];
}
