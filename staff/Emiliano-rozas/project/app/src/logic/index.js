import { getProducts } from './products/index';
import {
    registerUser,
    loginUser,
    isUserRoleModerator,
    isUserRoleRegular,
    isUserLoggedIn,
    logoutUser,
    getUserId,
    updateUserProfile,
    getUserProfile
} from './users/index';

import {
    updateCart,
    getCart,
    // addTocart,
    // removeAllFromCart,
    // updateQuantity,
} from './cart/index'

import {
    placeOrder,
    getOrders,
    updateOrder
} from './orders/index'

import {
    processPayment,
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
    getUserProfile,
    getProducts,
    getCart,
    updateCart,
    placeOrder,
    getOrders,
    updateOrder,
    processPayment,
    // addTocart,
    // removeAllFromCart,
    // updateQuantity,
}

export default logic