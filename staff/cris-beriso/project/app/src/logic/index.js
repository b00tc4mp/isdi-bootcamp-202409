import {
  isUserLoggedIn,
  loginUser,
  registerUser,
  getUserName,
  logoutUser
} from './users'

import {
  getProducts
} from './products'


const logic = {
  registerUser,
  loginUser,
  isUserLoggedIn,
  getUserName,
  logoutUser,

  getProducts
}

export default logic