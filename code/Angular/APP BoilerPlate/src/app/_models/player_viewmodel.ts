import {Recommendation} from "./recommendation";

export class PlayerViewModel{
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

  /*
  var FootballUserInfoSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'FootballUser'},
    personal_info: {
        name: {type: String, default: Date.now},
        avatar: {
            type: String,
            default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg/600px-Default_profile_picture_%28male%29_on_Facebook.jpg'
        },
        full_name: String,
        positions: [String],
        height: Number,
        weight: Number,
        date_of_birth: Date,
        foot: String,
        updated_at: {type: Date, default: Date.now}
    },
    external_ids: {
        zerozero: String,
    },
    current_season: {
        season_id: {type: Schema.Types.ObjectId, ref: 'FootballSeason'},
        name: String,
        team: {
            id: {type: Schema.Types.ObjectId, ref: 'FootballTeam'},
            acronym: String,
            avatar: String,
            name: String,
            full_name: String
        },
        stats: {
            games: {type: Number, default: 0},
            goals: {type: Number, default: 0},
            yellow_cards: {type: Number, default: 0},
            red_cards: {type: Number, default: 0},
            minutes_played: {type: Number, default: 0},
        },
        games: [{type: Schema.Types.ObjectId, ref: 'FootballMatch'}]
    },
    previous_seasons: [{type: Schema.Types.ObjectId, ref: 'FootballUserInfoSeason'}],
    media: [
        {
            title: {type: String, required: true},
            author: String,
            date: Date,
            image: String,
            text: {type: String, required: true},
            references: {
                leagues: [{
                    name: String,
                    id: {type: Schema.Types.ObjectId, ref: 'FootballCompetition'}
                }],
                team: [{
                    name: String,
                    id: {type: Schema.Types.ObjectId, ref: 'FootballTeam'}
                }],
                player: [{
                    name: String,
                    id: {type: Schema.Types.ObjectId, ref: 'FootballUserInfo'}
                }],
            }
        }
    ],
    skill_set: [
        {
            name: {type: String, required: true, unique: true},
            avatar: String,
            endorsements: [{type: Schema.Types.ObjectId, ref: 'FootballUserInfo'}],
        }
    ],
    recommendations: {
        list: [{type: Schema.Types.ObjectId, ref: 'FootballUserInfo'}],
        top_5: [
            {
                author: {
                    name: String,
                    id: {type: Schema.Types.ObjectId, ref: 'FootballUserInfo', required: true},
                    avatar: String,
                    team: {
                        id: String,
                        acronym: String,
                        avatar: String,
                        name: String,
                    },
                },
                text: String,

            }
        ],
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

   */

}
