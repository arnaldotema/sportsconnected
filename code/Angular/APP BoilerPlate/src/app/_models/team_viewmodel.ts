import {Recommendation} from "./recommendation";

export class TeamViewModel {
  acronym: string;
  avatar: {
    type: string,
    default: string
  };
  name: string;
  full_name: string;
  recommendations: {
    total_recommendations: number;
    last_recommendations: Recommendation[];
  };
  roster: {
    playes: [{
        user_id: string;
        name: string;
        avatar: string;
        age: number;
        positions: string[];
        nationality: string;
        residence: string;
        stats: {
          games: number,
          goals: number,
          assists: number,
          yellow_cards: number,
          red_cards: number,
          minutes_played: number
        };
      }];
    staff: [{
      user_id: string;
      name: string;
      avatar: string;
      age: number;
      position: string;
      nationality: string;
      residence: string;
    }]
  };


}
