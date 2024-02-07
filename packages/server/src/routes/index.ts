import express from "express"
import inventory from "./inventory"
import items from "./items"
import wsInventory from "./ws-inventory"

const router = express.Router()

router.use("/inventory", inventory)
router.use("/items", items)
router.use("/ws", wsInventory)

export default router
