import {Recommendation} from "./recommendation";

export class TeamViewModel{
  info : {
    name: string;
    avatar: string;
    full_name: string;
    positions: string[];
    height: number;
    weight: number;
    date_of_birth: string;
    foot: string;
  };
  team : {
    id: string;
    acronym: string;
    avatar: string;
    name: string;
  };
  current_season: {
    id: string;
    name: string;
    stats : {
      games: number;
      goals: number;
      yellow_cards: number;
      red_cards: number;
      minutes_played: number;
    }
  };
  media : {

  };
  skill_set : [
    {
      name : string;
      avatar : string;
      endorsements: number;
    }
  ];
  recommendations : {
    total_recommendations: number;
    last_recommendations: Recommendation[];
  };
}
