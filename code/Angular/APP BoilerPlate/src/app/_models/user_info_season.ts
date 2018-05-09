import {MatchViewModel} from './match_viewmodel';

export class User_Info_season{
  season_id: number;
  name: string;
  team: {
    id: number,
    acronym: string,
    avatar: string,
    name: string,
    full_name: string
  };
  stats: {
    games: number;
    goals: number;
    yellow_cards: number;
    red_cards: number;
    minutes_played: number;
  };
  games: MatchViewModel[]
}
