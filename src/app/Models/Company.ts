import {User} from "./users";

export class Company{
  id!: number;
  nomDenomination!: string;
  adresse!: string;
  numSiret!: string;
  numPhone!: string;
  users!: User[];
}
