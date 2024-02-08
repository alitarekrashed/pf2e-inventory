import express from "express"
import { addItem, deleteItem, moveItem } from "../controllers/inventory.controller"

const router = express.Router()

router.post("/:id/item", addItem)
router.delete("/:id/item/:itemId", deleteItem)
router.post("/:id/item/:itemId/move", moveItem)

export default router
