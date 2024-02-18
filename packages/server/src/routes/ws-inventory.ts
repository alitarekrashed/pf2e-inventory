import express from "express"
import expressWs from "express-ws"
import { getInventory } from "../controllers/inventory.controller"

const router = express.Router() as expressWs.Router
export const connectionMap: Map<string, any[]> = new Map()

export const mountRouter: () => expressWs.Router = () => {
  router.ws("/inventory/:id", (ws, req) => {
    const id = req.params.id
    ws.on("message", (msg: string) => {
      const object = JSON.parse(msg)
      if (object.command === "GET_INVENTORY") {
        ws.send(getInventory(id))
      }
    })
    addConnectionToMap(id, ws as unknown as WebSocket)
  })
  return router
}

function addConnectionToMap(id: string, ws: WebSocket) {
  if (connectionMap.has(id)) {
    connectionMap.get(id)?.push(ws)
  } else {
    connectionMap.set(id, [ws])
  }
}

export default router
