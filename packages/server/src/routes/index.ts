import express from "express"
import inventory from "./inventory"
import wsInventory from "./ws-inventory"

const router = express.Router()

router.use("/inventory", inventory)
router.use("/ws", wsInventory)

export default router
