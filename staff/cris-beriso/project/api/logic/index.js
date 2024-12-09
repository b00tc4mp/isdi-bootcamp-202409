import { registerUser, authenticateUser, getUserName, getWishlist } from './users/index.js'

import { addComment, removeComment, getComments, getProducts, toggleLikeProduct, toggleDislikeProduct, saveProduct, getProductDetails, searchProducts } from './products/index.js'

const logic = {
  registerUser,
  authenticateUser,
  getUserName,
  getWishlist,

  getProducts,
  addComment,
  removeComment,
  getComments,
  toggleLikeProduct,
  toggleDislikeProduct,
  saveProduct,
  getProductDetails,
  searchProducts
}

export default logic