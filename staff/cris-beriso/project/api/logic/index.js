import { registerUser, authenticateUser, getUserName } from './users/index.js'

import { addComment, removeComment, getComments, getProducts } from './products/index.js'

const logic = {
  registerUser,
  authenticateUser,
  getUserName,

  getProducts,
  addComment,
  removeComment,
  getComments
}

export default logic