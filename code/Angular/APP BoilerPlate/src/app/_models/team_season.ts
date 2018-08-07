import {Recommendation} from "./recommendation";
import {Media} from "./media";

export class TeamSeason{
  team_id: string;
  season_id: string;
  name: string;
  avatar: string;
  standings : [
    {
      id: string,
      competition_id: string,
      name: string,
      avatar: string,
      position: number,
      matches: number,
      wins: number,
      draws: number,
      losses: number,
      goals: number,
      goals_taken: number
    }
    ];
  matches: [{
    id: string,
    date: string,
    competition_season:{
      id: string,
      competition_id: string,
      name: string,
      avatar: string
    },
    home_team: {
      id: string,
      team_id: string,
      name: string,
      avatar: string,
      goals: number
    },
    away_team: {
      id: string,
      team_id: string,
      name: string,
      avatar: string,
      goals: number
    }
  }];
  players: [
    {
      id: string,
      user_info_id: string,
      name: string,
      avatar: string,
      number: string,
      nationality: string,
      positions: string[]
    }
  ];
  staff: [
    {
      id: string,
      user_info_id: string,
      name: string,
      avatar: string,
      nationality: string
    }
  ];
  media: Media[];
}
