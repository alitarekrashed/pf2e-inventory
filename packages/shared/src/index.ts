export type Rarity = "uncommon"
export type Category = "Adventuring Gear"
export type InventoryType = "Party" | "Character"
export type Currencies = "platinum" | "gold" | "silver" | "copper"

export interface Money {
  platinum: number
  gold: number
  silver: number
  copper: number
}

export interface PartyInventory {
  id: string
  money: Money
  items: CharacterItem[]
  party: {
    name: string
    inventory_ids: string[]
  }
  type: "Party"
}

export interface Inventory {
  id: string
  money: Money
  items: CharacterItem[]
  character: {
    name: string
    party_inventory_id: string
  }
  type: "Character"
}

export interface CharacterItem {
  id: string
  name_override?: string
  item: Equipment
}

export interface Equipment {
  id: string
  category: Category
  name: string
  level: number
  description: string
  price: Coinage[]
  bulk?: number | string
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
