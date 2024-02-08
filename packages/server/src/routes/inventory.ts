import express from "express"
import { addItem, deleteItem } from "../controllers/inventory.controller"

const router = express.Router()

router.post("/:id/item", addItem)
router.delete("/:id/item/:itemId", deleteItem)

export default router
