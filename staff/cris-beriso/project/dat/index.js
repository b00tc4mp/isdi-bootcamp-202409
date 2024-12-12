import { connect, disconnect } from 'mongoose'
import { User, Product, Store, StorePrice, Comment, Location, Point } from './models.js'
import './boost-mongoose.js'

const db = {
  connect,
  disconnect
}

export default db

export {
  User,
  Product,
  Store,
  StorePrice,
  Comment,
  Location,
  Point
}