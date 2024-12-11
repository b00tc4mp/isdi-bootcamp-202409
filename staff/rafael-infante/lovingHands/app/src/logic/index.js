import registerUser from './users/registerUser'
import loginUser from './users/loginUser'
import logoutUser from './users/logoutUser'
import isUserLoggedIn from './users/isUserLoggedIn'
import getUserName from './users/getUserName'
import getUserId from './users/getUserId'
import getUserLocation from './users/getUserLocation'

import createAd from './ads/createAd'
import getAds from './ads/getAds'
import deleteAd from './ads/deleteAd'

import toggleFavorite from './ads/toggleFavorite'
import getFavoriteAds from './ads/getFavoriteAds'

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
  getUserLocation,

  createAd,
  getAds,
  deleteAd,

  toggleFavorite,
  getFavoriteAds,

  deleteReview,
  addReview,
  getReviews,
}

export default logic
