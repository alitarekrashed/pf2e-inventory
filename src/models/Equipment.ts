import { Coinage } from "./Coinage";

export type Rarity = "uncommon";

export interface Equipment {
  name: string;
  level: number;
  description: string;
  price: Coinage[];
  bulk?: string;
  rarity?: Rarity;
  access?: string;
  usage?: string;
  hands?: string;
}
