import express, { Express } from "express"
import routes from "./routes/index"
import { mountRouter } from "./routes/ws-inventory"

const app: Express = express()
app.use(express.json())
export const expressWs = require("express-ws")(app)
const cors = require("cors")

mountRouter()

const port = 3000

app.use(cors())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")

  res.header("Access-Control-Allow-Headers", "origin,X-Requested-With,Content-Type,Accept,Authorization")
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST PUT")
    return res.status(200).json({})
  }
  next()
})

app.use("/", routes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
