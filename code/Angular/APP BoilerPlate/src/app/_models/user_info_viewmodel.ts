export class UserInfoViewModel {
  user_id: number;
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
  external_ids: {
    zerozero: string,
  };
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
      competition_name: string, // TODO: Criado um array para as diferentes competições na mesma season. Adicionados alguns campos novos
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
  skill_set: [
    {
      name: string,
      avatar: string,
      endorsements: number,
    }
    ];
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
  created_at: string;
  updated_at: string;
}
