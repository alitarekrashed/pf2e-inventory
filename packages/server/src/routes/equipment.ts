import express from "express"
import { getEquipment } from "../controllers/equipment.controller"

const router = express.Router()

router.get("/", getEquipment)

export default router
