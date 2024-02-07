import express from "express"
import { addItem, deleteItem } from "../controllers/inventory.controller"

const router = express.Router()

router.post("/item", addItem)
router.delete("/item/:id", deleteItem)

export default router
