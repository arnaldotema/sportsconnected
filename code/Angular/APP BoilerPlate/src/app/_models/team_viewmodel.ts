import {Recommendation} from './recommendation';
import {Achievement} from './achievement';
import {TeamSeason} from "./team_season";

export class TeamViewModel {
  acronym: string;
  avatar: string;
  name: string;
  full_name: string;
  current_season: TeamSeason;
  history_stats: TeamSeason[];
  tryouts: [{
    address: string;
    age_group: string;
    days: string;
    time: string;
    requirements: string;
  }];
  additional_info: {
    site: string;
    email: string;
    phone_number: string;
    address: string;
    president: string;
    vice_president: string;
    sports_director: string;
    number_of_teams: number;
    number_of_athletes: number;
    number_of_coaches: number;
    number_of_physiotherapists: number;
    number_of_grass_fields: number;
    number_of_synthetic_fields: number;
    number_of_locker_rooms: number;
    sponsors: [{
      link: string;
      name: string
    }];
    other_sports: string[]
  };
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
  };
  followers : number [];
  achievements: Achievement[];
}
