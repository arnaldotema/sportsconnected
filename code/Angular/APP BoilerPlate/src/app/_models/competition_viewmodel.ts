import {CompetitionSeason} from './competition_season';

export class CompetitionViewModel{
  name : string;
  current_season: {
    matchdays : number[];
    standings : number[];
    stats : number[]
  };
  previous_seasons: CompetitionSeason[]
}
