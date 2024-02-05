export type Coin = "cp" | "sp" | "pp" | "gp";

export interface Coinage {
  value: number;
  type: Coin;
}
