import express from "express"
import expressWs from "express-ws"
import { getInventory } from "../controllers/inventory.controller"

const router = express.Router() as expressWs.Router

export const mountRouter: () => expressWs.Router = () => {
  router.ws("/inventory/:id", (ws, req) => {
    ws.on("message", (msg: string) => {
      const object = JSON.parse(msg)
      if (object.command === "GET_INVENTORY") {
        ws.send(getInventory(req.params.id))
      }
    })
  })
  return router
}

export default router
