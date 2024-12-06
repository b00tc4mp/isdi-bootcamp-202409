import {
  isUserLoggedIn,
  loginUser,
  registerUser,
  getUserName,
  logoutUser,
  getUserId
} from './users'

import {
  getProducts,
  addComment,
  getComments,
  removeComment,
  toggleLikeProduct,
  toggleDislikeProduct,
  saveProduct
} from './products'


const logic = {
  registerUser,
  loginUser,
  isUserLoggedIn,
  getUserName,
  logoutUser,
  getUserId,

  getProducts,
  addComment,
  getComments,
  removeComment,
  toggleLikeProduct,
  toggleDislikeProduct,
  saveProduct
}

export default logic