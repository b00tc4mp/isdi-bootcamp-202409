import {
    registerUser,
    authenticateUser,
    updateUserProfile,
    getUserProfile
} from './users/index.js'

import {
    getProducts,
} from './products/index.js'

import {
    getCart,
    updateCart
} from './cart/index.js'

import {
    placeOrder,
    getOrders,
    updateOrder
} from './orders/index.js'

import {
    processPayment,
} from './payments/index.js'


const logic = {
    registerUser,
    authenticateUser,
    updateUserProfile,
    getUserProfile,
    getProducts,
    getCart,
    placeOrder,
    getOrders,
    updateOrder,
    processPayment,
    updateCart

}
export default logic