
import {Recommendation} from "./recommendation";

export class Team_Season{
  acronym: string;
  avatar: {
    type: string,
    default: string
  };
  name: string;
  full_name: string;
  recommendations : {
    total_recommendations: number;
    last_recommendations: Recommendation[];
  };
}
