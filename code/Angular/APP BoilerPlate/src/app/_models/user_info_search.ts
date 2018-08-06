import {Achievement} from './achievement';
import {SearchEntityViewmodel} from './search_entity_viewmodel';

export class UserInfoSearch extends SearchEntityViewmodel{

  constructor(){
    super();
  }

  // Inherit from the extended class
  name: string;
  team: {
    id: number,
    acronym: string,
    avatar: string,
    name: string,
    full_name: string
  };
  id: string;
  type: string;
  avatar: string;

  user_id: string;
  personal_info: {
    name: string,
    age: number,
    avatar: string,
    full_name: string,
    positions: string[],
    height: number,
    weight: number,
    date_of_birth: string,
    foot: string,
    nationality: string,
    residence: string,
    updated_at: string
  };
  followers : number [];
  current_season: {
    season_id: number,
    name: string,
    team: {
      id: number,
      acronym: string,
      avatar: string,
      name: string,
      full_name: string
    },
    stats: [{
      season: string,
      competition_name: string,
      competition_avatar: string,
      games: number,
      wins: number,
      losses: number,
      draws: number,
      goals: number,
      assists: number,
      yellow_cards: number,
      red_cards: number,
      minutes_played: number
    }],
    games: number[]
  };
  previous_seasons: number[];
  skill_set: [{
      name: string,
      avatar: string,
      endorsements: number[],
    }];
  recommendations: {
    list: number[]
  };
  achievements: Achievement[];
}