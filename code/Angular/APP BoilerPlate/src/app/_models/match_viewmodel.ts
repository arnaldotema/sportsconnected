import {TeamMatch} from './team_match';

export class MatchViewModel{
  played: boolean;
  external_ids: {
    zerozero: number
  };
  date: string;
  duration : number;
  phase: string;
  stadium: string;
  referee: string;
  competition: {
    name: string;
    avatar: string;
    id: string;
    external_ids:{
      zerozero: number
    }
  };
  home_team : TeamMatch;
  away_team : TeamMatch;
}
