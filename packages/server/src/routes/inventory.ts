import express from "express"
import { addItem } from "../controllers/inventory.controller"

const router = express.Router()

router.post("/item", addItem)

export default router
