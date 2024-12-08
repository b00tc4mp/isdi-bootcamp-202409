import {
  isUserLoggedIn,
  loginUser,
  registerUser,
  getUserName,
  logoutUser,
  getUserId,
  getWishlist
} from './users'

import {
  getProducts,
  addComment,
  getComments,
  removeComment,
  toggleLikeProduct,
  toggleDislikeProduct,
  saveProduct,
  getProductDetails
} from './products'


const logic = {
  registerUser,
  loginUser,
  isUserLoggedIn,
  getUserName,
  logoutUser,
  getUserId,
  getWishlist,

  getProducts,
  addComment,
  getComments,
  removeComment,
  toggleLikeProduct,
  toggleDislikeProduct,
  saveProduct,
  getProductDetails
}

export default logic