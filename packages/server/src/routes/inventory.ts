import express from "express"
import { getInventory } from "../controllers/inventory.controller"

const router = express.Router()

router.get("/", getInventory)

export default router
