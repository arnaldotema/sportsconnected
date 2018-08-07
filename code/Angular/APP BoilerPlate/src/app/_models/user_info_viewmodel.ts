import {Achievement} from './achievement';
import {UserInfoSeason} from "./user_info_season";

//NEW put correct information in "user_info_season"

export class UserInfoViewModel {
  _id: string;
  user_id: string;
  followers : string[];
  current_season: UserInfoSeason;
  previous_seasons: UserInfoSeason[];
  skill_set: [{
      name: string,
      avatar: string,
      endorsements: string[],
    }];
  recommendations: {
    list: number[],
    top_5: [{
        author: {
          name: string,
          relationship: string,
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
      }],
  };
  achievements: Achievement[];
  created_at: string;
  updated_at: string;
}
