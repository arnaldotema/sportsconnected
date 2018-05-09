import {CompetitionSeason} from './competition_season';

export class CompetitionViewModel{
  name : string;
  current_season: {
    matchdays : [],
    standings : [],
    stats : []
  };
  previous_seasons: CompetitionSeason[]
}
