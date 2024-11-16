import { connect, disconnect } from 'mongoose'
import './boost-mongoose.js'
import models from "./models.js"

const db = {
  connect,
  disconnect
}

export default db

export {
  models
}