import { Company } from "./Company"; // Include if needed

export class Tva {
  id!: number;
  vente!: number;
  aoi!: number;
  tvaBrute20!: number;
  tvaBrute10!: number;
  tvaBrute55!: number;
  totTvaBruteDue!: number;
  abservice!: number;
  totTvaDed!: number;
  totTvaDue!: number;
  tvaNetDue!: number;
  taxAss!: number;
  totPayer!: number;
  creationDate: Date = new Date();
}
