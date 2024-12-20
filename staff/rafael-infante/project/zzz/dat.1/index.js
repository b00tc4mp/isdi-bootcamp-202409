import { connect, disconnect } from 'mongoose'
import { User, Ad, Review } from './models.js'

const db = {
  connect,
  disconnect,
}

export default db

export { User, Ad, Review }
