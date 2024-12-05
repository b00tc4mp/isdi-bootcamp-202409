import { registerUser, authenticateUser, getUserName } from './users/index.js'

import { addComment, removeComment, getComments, getProducts, toggleLikeProduct, toggleDislikeProduct } from './products/index.js'

const logic = {
  registerUser,
  authenticateUser,
  getUserName,

  getProducts,
  addComment,
  removeComment,
  getComments,
  toggleLikeProduct,
  toggleDislikeProduct
}

export default logic