import { NextFunction, Request, Response } from "express"
import { Equipment } from "@pf2e-inventory/shared"
import { expressWs } from "../app"
import { ITEMS } from "./items.controller"

const inventory: Equipment[] = [...ITEMS]

export const addItem = async (req: Request, res: Response, next: NextFunction) => {
  inventory.push(req.body)
  expressWs.getWss().clients.forEach((client: WebSocket) => {
    client.send(getInventory())
  })
  res.send()
}

export const getInventory = () => {
  return JSON.stringify(inventory)
}
