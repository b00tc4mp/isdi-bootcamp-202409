import { connect, disconnect } from 'mongoose'
import { User, Product, Review, CartItem, Cart, OrderItem, Order } from './models.js'
import './boost-mongoose.js'

const db = {
    connect,
    disconnect
}

export default db

export {
    User,
    Product,
    Review,
    CartItem,
    Cart,
    OrderItem,
    Order
}