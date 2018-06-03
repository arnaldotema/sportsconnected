import {UserInfoViewModel} from './user_info_viewmodel';

export class User {
  email: string;
  password: string;
  last_login: string;
  subscription_expiration: string;
  player: UserInfoViewModel;


  search_entity_viewmodel: {
    name: string;
    id: string;
    type: string;
    avatar: string;
  };

  search_obj: {
    players: [
      {
        name: string,
        id: string,
        avatar: string,
        team: {
          short_name: string,
          id: string,
          avatar: string,
        },
        position: string,
        date_of_birth: string,
        records: {
          seasons: [
            {
              season_id: string,
              season_name: string,
              leagues: [
                {
                  name: string,
                  league_id: string,
                  avatar: string,
                  games: string[], // games ids
                  stats: {
                    games: number,
                    goals: number,
                    assists: number,
                    yellow_cards: number,
                    red_cards: number,
                    minutes_played: number
                  }
                }
                ]
            }
            ]
        },
      }
    ];
    teams: [
      {
        short_name: string,
        name: string,
        full_name: string,
        id: string,
        avatar: string,
        records: {
          seasons: [
            {
              season_id: string,
              season_name: string,
              leagues: [
                {
                  name: string,
                  league_id: string,
                  avatar: string,
                  games: string[], // games ids
                  stats: {
                    classification: number,
                    games: number,
                    wins: number,
                    losses: number,
                    draws: number,
                    scored_goals: number,
                    suffered_goals: number,
                    assists: number,
                  }
                }
              ]
            }
          ]
        }
      }
    ];
    staff: [
      {
        name: string,
        id: string,
        avatar: string,
        team: {
          short_name: string,
          id: string,
          avatar: string,
        },
        role: string,
        date_of_birth: string,
        records: {
          seasons: [
            {
              season_id: string,
              season_name: string,
              leagues: [
                {
                  name: string,
                  league_id: string,
                  avatar: string,
                  games: string[], // games ids
                  stats: {
                    classification: number,
                    games: number,
                    wins: number,
                    losses: number,
                    draws: number,
                    scored_goals: number,
                    suffered_goals: number,
                    assists: number,
                  }
                }
                ]
            }
            ]
        }
      }
    ];
}

}
