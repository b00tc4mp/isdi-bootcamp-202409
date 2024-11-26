import { connect, disconnect } from "mongoose"
import { User, Event, Comment } from "./models.js"

const db = {
  connect,
  disconnect,
}

export default db

export { User, Event, Comment }
