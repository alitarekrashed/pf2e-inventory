import express from "express"
import expressWs from "express-ws"
import { getInventoryWebSocket } from "../controllers/inventory.controller"

const router = express.Router() as expressWs.Router

export const mountRouter = () => {
  router.ws("/inventory", (ws, req) => {
    ws.on("message", (msg: string) => {
      const object = JSON.parse(msg)
      if (object.command === "GET_INVENTORY") {
        ws.send(getInventoryWebSocket())
      }
    })
  })
}

export default router
