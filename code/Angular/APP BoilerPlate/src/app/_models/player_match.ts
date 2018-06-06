import {Achievement} from './achievement';

export class PlayerMatch {
  name: string;
  id: string;
  external_ids:{
    zerozero: number
  };
  number: number;
  positions: string[];
  goals: string[];
  assists: string[];
  yellow_cards: string[];
  red_cards: string[];
  minutes_played: number;
  go_in:string[];
  go_out:string[];
  avatar: string
}
