import { NextFunction, Request, Response } from "express"
import { Inventory, PartyInventory } from "@pf2e-inventory/shared"
import { connectionMap } from "../routes/ws-inventory"

const inventories: (Inventory | PartyInventory)[] = [
  {
    id: "1",
    money: {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 0,
    },
    items: [],
    character: {
      name: "Vakarai",
      party_inventory_id: "",
    },
    type: "Character",
  },
  {
    id: "2",
    money: {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 0,
    },
    items: [],
    party: {
      name: "Pirates",
      inventory_ids: ["1"],
    },
    type: "Party",
  },
]

function findInventory(id: string) {
  return inventories.find((value) => value.id === id)
}

// TODO eventually there needs to be a distinction between Equipment (Pathfinder rule item) and CharacterItem (item on character)
// different ids, etc.

export const addItem = async (req: Request, res: Response, next: NextFunction) => {
  const inventoryId: string = req.params.id

  const value = findInventory(inventoryId)
  value?.items.push({
    id: `${value.items.length}`,
    item: req.body,
  })

  connectionMap.get(inventoryId)?.forEach((client: WebSocket) => {
    client.send(getInventory(inventoryId))
  })
  res.send()
}

export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  const inventoryId: string = req.params.id
  const itemId: string = req.params.itemId

  const value = findInventory(inventoryId)

  const index = value!.items.findIndex((value) => value.id === itemId)
  value?.items.splice(index, 1)

  connectionMap.get(inventoryId)?.forEach((client: WebSocket) => {
    client.send(getInventory(inventoryId))
  })
  res.send()
}

export const getInventory = (id: string) => {
  return JSON.stringify(findInventory(id))
}
