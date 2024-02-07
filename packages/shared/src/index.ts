export type Rarity = "uncommon"
export type Category = "Adventuring Gear"

export interface Inventory {
  money: {
    platinum: number
    gold: number
    silver: number
    copper: number
  }
  items: CharacterItem[]
}

export interface CharacterItem {
  id: string
  name_override?: string
  item: Equipment
}

// todo support type?
export interface Equipment {
  id: string
  category: Category
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
