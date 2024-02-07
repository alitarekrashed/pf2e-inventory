import express from "express"
import { getItems } from "../controllers/items.controller"

const router = express.Router()

router.get("/", getItems)

export default router
