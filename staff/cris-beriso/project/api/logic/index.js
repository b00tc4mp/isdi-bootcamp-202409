import { registerUser, authenticateUser, getWishlist } from './users/index.js'

import { addComment, removeComment, getComments, toggleLikeProduct, toggleDislikeProduct, saveProduct, getProductDetails, searchProducts, getStorePrices } from './products/index.js'

const logic = {
  registerUser,
  authenticateUser,
  getWishlist,

  addComment,
  removeComment,
  getComments,
  toggleLikeProduct,
  toggleDislikeProduct,
  saveProduct,
  getProductDetails,
  searchProducts,
  getStorePrices
}

export default logic