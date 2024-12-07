import registerUser from './users/registerUser'
import loginUser from './users/loginUser'
import logoutUser from './users/logoutUser'
import isUserLoggedIn from './users/isUserLoggedIn'
import getUserName from './users/getUserName'
import getUserId from './users/getUserId'

import createAd from './ads/createAd'
import getAds from './ads/getAds'
import deleteAd from './ads/deleteAd'

import toggleFavorite from './ads/toggleFavorite'

import deleteReview from './ads/deleteReview'
import addReview from './ads/addReview'
import getReviews from './ads/getReviews'

const logic = {
  registerUser,
  loginUser,
  isUserLoggedIn,
  logoutUser,
  getUserName,
  getUserId,

  createAd,
  getAds,
  deleteAd,

  toggleFavorite,

  deleteReview,
  addReview,
  getReviews,
}

export default logic
