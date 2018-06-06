import {Achievement} from './achievement';
import {PlayerMatch} from './player_match';

export class TeamMatch {
  id: string;
  name: string;
  avatar: string;
  goals: string[];
  achievements: Achievement[];
  main_lineup: PlayerMatch[];
  reserves: PlayerMatch[];
  coach:{
    name: string;
    id: string;
    avatar: string,
    nationality: string,
    external_ids:{
      zerozero: number
    }
  }
}
