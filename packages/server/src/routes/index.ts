import express from "express"
import inventory from "./inventory"

const router = express.Router()

router.use("/inventory", inventory)

export default router
