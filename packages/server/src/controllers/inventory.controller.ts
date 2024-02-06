import { NextFunction, Request, Response } from "express"
import { Equipment } from "@pf2e-inventory/shared"
import { expressWs } from "../app"

const CANDLE: Equipment = {
  name: "candle",
  level: 0,
  description: "A lit candle sheds dim light in a 10-foot radius for 8 hours.",
  price: [{ value: 1, type: "cp" }],
  hands: "1",
}

const TRAITORS_RING: Equipment = {
  name: "traitor's ring",
  level: 0,
  description:
    "This ring has a thick band supporting a square-cut gem that can be customized to the buyer's preference. The thickness of the band allows it to be taken to any jeweler or blacksmith to be adjusted to different hands or fingers from the original make. There is a tiny clasp at the side of the gem that, when pressed, opens the gem, revealing a small, hinged compartment. This compartment is designed to hold one dose of poison, allowing wearers to slip the contents of the ring into the food or drink of an intended target. The compartment can be closed again by gently pressing the gem back into place. Noticing the compartment requires a DC 15 Perception check for anyone inspecting the ring.",
  access: "Member of a secret society",
  usage: "worn",
  price: [
    {
      value: 1,
      type: "gp",
    },
    {
      value: 5,
      type: "sp",
    },
  ],
  rarity: "uncommon",
}

const rows: Equipment[] = [CANDLE, TRAITORS_RING]

export const getInventory = async (req: Request, res: Response, next: NextFunction) => {
  return res.send(rows)
}

export const addItem = async (req: Request, res: Response, next: NextFunction) => {
  rows.push(CANDLE)
  expressWs.getWss().clients.forEach((client: WebSocket) => {
    client.send(getInventoryWebSocket())
  })
  res.send()
}

export const getInventoryWebSocket = () => {
  return JSON.stringify(rows)
}
