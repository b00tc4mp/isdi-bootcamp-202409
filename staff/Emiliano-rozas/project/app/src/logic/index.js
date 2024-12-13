import { getProducts } from './products/index';
import {
    registerUser,
    loginUser,
    isUserRoleModerator,
    isUserRoleRegular,
    isUserLoggedIn,
    logoutUser,
    getUserId,
    updateUserProfile
} from './users/index';

import {
    getCart,
    addTocart,
    removeAllFromCart,
    updateQuantity,
    updateCart
} from './cart/index'

import {
    placeOrder,
    getOrders,
    updateOrder
} from './orders/index'

import {
    processPayment,
    retrievePayment
} from './payments/index'


const logic = {
    registerUser,
    loginUser,
    isUserRoleModerator,
    isUserRoleRegular,
    isUserLoggedIn,
    logoutUser,
    getUserId,
    updateUserProfile,
    getProducts,
    getCart,
    addTocart,
    removeAllFromCart,
    updateQuantity,
    updateCart,
    placeOrder,
    getOrders,
    updateOrder,
    processPayment,
    retrievePayment
}

export default logic