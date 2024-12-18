import {
  isUserLoggedIn,
  loginUser,
  registerUser,
  logoutUser,
  getUserId,
  getWishlist,
  getUserLocation
} from './users'

import {
  addComment,
  getComments,
  removeComment,
  toggleLikeProduct,
  toggleDislikeProduct,
  saveProduct,
  getProductDetails,
  searchProducts,
  getStorePrices
} from './products'


const logic = {
  registerUser,
  loginUser,
  isUserLoggedIn,
  logoutUser,
  getUserId,
  getWishlist,
  getUserLocation,

  addComment,
  getComments,
  removeComment,
  toggleLikeProduct,
  toggleDislikeProduct,
  saveProduct,
  getProductDetails,
  searchProducts,
  getStorePrices
}

export default logic