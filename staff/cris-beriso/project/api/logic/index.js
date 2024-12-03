import { registerUser, authenticateUser, getUserName } from './users/index.js'

import { getProducts } from './products/index.js'

const logic = {
  registerUser,
  authenticateUser,
  getUserName,

  getProducts
}

export default logic