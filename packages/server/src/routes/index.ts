import express from "express"
import inventory from "./inventory"
import equipment from "./equipment"
import wsInventory from "./ws-inventory"

const router = express.Router()

router.use("/inventory", inventory)
router.use("/equipment", equipment)
router.use("/ws", wsInventory)

export default router
