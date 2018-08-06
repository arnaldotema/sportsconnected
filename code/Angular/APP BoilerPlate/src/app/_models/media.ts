//Nova classe, was too big already to be nested.
export class Media{
  title: string;
  author: string;
  date: string;
  image: string;
  ref: string; //Todo: Added ref for videos or other things alike
  views: number; //Todo: Added
  shares: number; //Todo: Added
  likes: number; //Todo: Added
  text: string;
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
}
