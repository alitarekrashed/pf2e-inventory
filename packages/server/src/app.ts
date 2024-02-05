import express, { Express, Request, Response } from "express"
import routes from "./routes/index"

const app: Express = express()

app.use(express.json())

const port = 3000

app.use("/", routes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
