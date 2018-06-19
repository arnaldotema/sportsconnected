import {Achievement} from './achievement';

export class PlayerMatch {
  name: string;
  id: string;
  external_ids:{
    zerozero: number
  };
  number: number;
  positions: string[];
  goals: number;
  assists: number;
  yellow_cards: number;
  red_cards: number;
  minutes_played: number;
  go_in:string[];
  go_out:string[];
  avatar: string
}
