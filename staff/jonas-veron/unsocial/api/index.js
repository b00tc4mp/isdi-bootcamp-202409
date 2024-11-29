import "dotenv/config"
import db from "dat"
import express, { json } from "express"
import cors from "cors"

import logic from "./logic/index.js"
import { errorHandler } from "./helpers/index.js"
import { usersRouter } from "./routes/index.js"

db.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to db")

  const server = express()

  server.use(cors())

  server.get("/", (_, res) => res.send("Hello, API!"))

  server.post("/users", usersRouter)
  server.post("/posts", postRouter)

  server.use(errorHandler)

  server.listen(process.env.PORT, () =>
    console.log(`API listening on port ${process.env.PORT}`)
  )
})
