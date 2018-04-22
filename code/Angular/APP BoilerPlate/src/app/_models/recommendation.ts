export class Recommendation{
  author:{
    name : string;
    id: string;
    avatar: string;
    team : {
      id: string;
      acronym: string;
      avatar: string;
      name: string;
    };
  };
  text: string;
}
