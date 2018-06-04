
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
  home_team : {
    name: string;
    avatar: string;
    main_lineup:[
      {
        name: string;
        id: string;
        external_ids:{
          zerozero: number
        };
        number: number;
        goals: number[];
        assists: number[];
        yellow_cards: number[];
        red_cards: number[];
        minutes_played: number;
        go_in:number[];
        go_out:number[]
      }
      ];
    reserves:[
      {
        name: string;
        id: string;
        external_ids:{
          zerozero: number
        };
        number: number;
        goals: number[];
        assists: number[];
        yellow_cards: number[];
        red_cards: number[];
        minutes_played: number;
        go_in:number[];
        go_out:number[]
      }
      ];
    coach:{
      name: string;
      id: string;
      external_ids:{
        zerozero: number
      }
    }
  };
  away_team : {
    name: string;
    avatar: string;
    main_lineup:[
      {
        name: string;
        id: string;
        external_ids:{
          zerozero: number
        };
        number: number;
        goals: number[];
        assists: number[];
        yellow_cards: number[];
        red_cards: number[];
        minutes_played: number;
        go_in:number[];
        go_out:number[]
      }
      ];
    reserves:[
      {
        name: string;
        id: string;
        external_ids:{
          zerozero: number
        };
        number: number;
        goals: number[];
        assists: number[];
        yellow_cards: number[];
        red_cards: number[];
        minutes_played: number;
        go_in:number[];
        go_out:number[]
      }
      ];
    coach:{
      name: string;
      id: string;
      external_ids:{
        zerozero: number
      }
    }
  }
}
