export type Rarity = "uncommon"

export interface Equipment {
  id: string
  name: string
  level: number
  description: string
  price: Coinage[]
  bulk?: string
  rarity?: Rarity
  access?: string
  usage?: string
  hands?: string
}

export type Coin = "cp" | "sp" | "pp" | "gp"

export interface Coinage {
  value: number
  type: Coin
}
