import express from "express"
import { addItem, deleteItem, fetchInventories, fetchInventory, moveItem } from "../controllers/inventory.controller"

const router = express.Router()

router.get("/", fetchInventories)
router.get("/:id", fetchInventory)
router.post("/:id/item", addItem)
router.delete("/:id/item/:itemId", deleteItem)
router.post("/:id/item/:itemId/move", moveItem)

export default router
