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
    list: number[],
    top_5: [
      {
        author: {
          name: string,
          id: number,
          avatar: string,
          team: {
            id: string,
            acronym: string,
            avatar: string,
            name: string,
          },
        },
        text: string,
      }
      ],
  }
  roster: {
    players: [{
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
