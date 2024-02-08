import express from "express"
import { addItem, deleteItem, fetchInventory, moveItem } from "../controllers/inventory.controller"

const router = express.Router()

router.get("/:id", fetchInventory)
router.post("/:id/item", addItem)
router.delete("/:id/item/:itemId", deleteItem)
router.post("/:id/item/:itemId/move", moveItem)

export default router
