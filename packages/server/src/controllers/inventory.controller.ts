import { NextFunction, Request, Response } from "express"
import { Inventory } from "@pf2e-inventory/shared"
import { expressWs } from "../app"

const inventory: Inventory = {
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
}

// TODO eventually there needs to be a distinction between Equipment (Pathfinder rule item) and CharacterItem (item on character)
// different ids, etc.

export const addItem = async (req: Request, res: Response, next: NextFunction) => {
  inventory.items.push({
    id: `${inventory.items.length}`,
    item: req.body,
  })
  expressWs.getWss().clients.forEach((client: WebSocket) => {
    client.send(getInventory())
  })
  res.send()
}

export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id
  const index = inventory.items.findIndex((value) => value.id === id)
  inventory.items.splice(index, 1)

  expressWs.getWss().clients.forEach((client: WebSocket) => {
    client.send(getInventory())
  })
  res.send()
}

export const getInventory = () => {
  return JSON.stringify(inventory)
}
