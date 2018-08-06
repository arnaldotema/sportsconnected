//Mudei de user_XXX para embbed
export class Achievement{
  id: string;
  name: string;
  avatar: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    positions: string[]
  }
}
