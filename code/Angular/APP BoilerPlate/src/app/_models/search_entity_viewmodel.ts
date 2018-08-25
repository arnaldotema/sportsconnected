export class SearchEntityViewmodel {
  personal_info:{
    name: string,
    avatar: string
    age: number; // added
    date_of_birth: string;// added
  };
  team: {
    id: string,
    acronym: string,
    avatar: string,
    name: string,
    full_name: string
  };
  _id: string;
  user_info_id: string;
  type: string;
}
