import {
    registerUser,
    authenticateUser
} from './users/index.js'

import {
    getProducts,
    createProduct
} from './products/index.js'

import {
    addToCart,
    getCart,
    removeAllFromCart,
    updateQuantity
} from './cart/index.js'

import {
    placeOrder,
    getOrders,
    updateOrder
} from './orders/index.js'

const logic = {
    registerUser,
    authenticateUser,
    getProducts,
    createProduct,
    addToCart,
    getCart,
    removeAllFromCart,
    updateQuantity,
    placeOrder,
    getOrders,
    updateOrder
}
export default logic