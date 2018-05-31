import {Recommendation} from './recommendation';

export class TeamViewModel {
  acronym: string;
  avatar: string;
  name: string;
  full_name: string;
  current_season: {
    season_id: string,
    name: string,
    stats: [{
      competition_name: string,
      competition_avatar: string,
      games: number,
      classification: string,
      wins: number,
      losses: number,
      draws: number,
    }]
  };
  tryouts: [{
    address: string;
    age_group: string;
    days: string;
    time: string;
    requirements: string;
  }];
  personal_info: {
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
  roster: {
    players: [{
      user_id: string;
      name: string;
      avatar: string;
      age: number;
      number: number;
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
    }];
  };
  media: [{
    title: string,
    author: string,
    date: string,
    image: string,
    ref: string, //Todo: Added ref for videos or other things alike
    views: number, //Todo: Added
    shares: number, //Todo: Added
    likes: number, //Todo: Added
    text: string,
    references: {
      leagues: [{
        name: string,
        id: number,
      }],
      team: [{
        name: string,
        id: number
      }],
      player: [{
        name: string,
        id: number
      }],
    }
  }];
}
