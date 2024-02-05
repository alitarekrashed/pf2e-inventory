import express from "express"
import { addItem, getInventory } from "../controllers/inventory.controller"

const router = express.Router()

router.get("/", getInventory)
router.post("/item", addItem)

export default router
