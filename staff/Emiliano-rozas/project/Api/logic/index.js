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

const logic = {
    registerUser,
    authenticateUser,
    getProducts,
    createProduct,
    addToCart,
    getCart,
    removeAllFromCart,
    updateQuantity
}
export default logic