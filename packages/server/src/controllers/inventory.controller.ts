import { NextFunction, Request, Response } from "express"
import { CharacterItem, Inventory, MoveItemRequest, PartyInventory } from "@pf2e-inventory/shared"
import { connectionMap } from "../routes/ws-inventory"
import { v4 as uuidv4 } from "uuid"

const inventories: (Inventory | PartyInventory)[] = [
  {
    id: "1",
    money: {
      platinum: 0,
      gold: 15,
      silver: 0,
      copper: 0,
    },
    items: [],
    character: {
      name: "Vakarai",
      party_inventory_id: "2",
    },
    type: "Character",
  },
  {
    id: "2",
    money: {
      platinum: 10,
      gold: 5,
      silver: 2,
      copper: 0,
    },
    items: [],
    party: {
      name: "Pirates",
      inventory_ids: ["1", "3"],
    },
    type: "Party",
  },
  {
    id: "3",
    money: {
      platinum: 9999,
      gold: 0,
      silver: 0,
      copper: 0,
    },
    items: [],
    character: {
      name: "Big Z",
      party_inventory_id: "2",
    },
    type: "Character",
  },
]

function findInventory(id: string) {
  return inventories.find((value) => value.id === id)
}

export const fetchInventory = async (req: Request, res: Response, next: NextFunction) => {
  const inventoryId: string = req.params.id
  const value = findInventory(inventoryId)
  res.send(value)
}

export const fetchInventories = async (req: Request, res: Response, next: NextFunction) => {
  const ids = req.query.id
  let result: (Inventory | PartyInventory | undefined)[] = []

  if (ids) {
    if (Array.isArray(ids)) {
      result = ids.map((id) => findInventory(id as string))
    } else {
      result = [findInventory(ids as string)]
    }
  }

  res.send(result)
}

// TODO eventually there needs to be a distinction between Equipment (Pathfinder rule item) and CharacterItem (item on character)
// different ids, etc.

export const addItem = async (req: Request, res: Response, next: NextFunction) => {
  const inventoryId: string = req.params.id

  const value = findInventory(inventoryId)
  value?.items.push({
    id: uuidv4(),
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

export const moveItem = async (req: Request, res: Response, next: NextFunction) => {
  const inventoryId: string = req.params.id
  const itemId: string = req.params.itemId
  const request: MoveItemRequest = req.body

  const sourceInventory = findInventory(inventoryId)
  const targetInventory = findInventory(request.target)

  if (sourceInventory && targetInventory) {
    const index = sourceInventory.items.findIndex((value) => value.id === itemId)
    const itemToMove: CharacterItem = sourceInventory.items.splice(index, 1)[0]
    targetInventory.items.push(itemToMove)
  }

  connectionMap.get(inventoryId)?.forEach((client: WebSocket) => {
    client.send(getInventory(inventoryId))
  })

  connectionMap.get(request.target)?.forEach((client: WebSocket) => {
    client.send(getInventory(request.target))
  })

  res.send()
}

export const getInventory = (id: string) => {
  return JSON.stringify(findInventory(id))
}
