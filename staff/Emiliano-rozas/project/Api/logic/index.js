import {
    registerUser,
    authenticateUser,
    updateUserProfile,
    getUserProfile
} from './users/index.js'

import {
    getProducts,
    createProduct
} from './products/index.js'

import {
    addToCart,
    getCart,
    removeAllFromCart,
    updateQuantity,
    updateCart
} from './cart/index.js'

import {
    placeOrder,
    getOrders,
    updateOrder
} from './orders/index.js'

import {
    processPayment,
    retrievePayment,
    stripePayment
} from './payments/index.js'


const logic = {
    registerUser,
    authenticateUser,
    updateUserProfile,
    getUserProfile,
    getProducts,
    createProduct,
    addToCart,
    getCart,
    removeAllFromCart,
    updateQuantity,
    placeOrder,
    getOrders,
    updateOrder,
    processPayment,
    retrievePayment,
    stripePayment,
    updateCart

}
export default logic