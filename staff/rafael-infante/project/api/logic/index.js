import authenticateUser from './users/authenticateUser.js'
import registerUser from './users/registerUser.js'
import getUserName from './users/getUserName.js'
import changePassword from './users/changePassword.js'
import changeEmail from './users/changeEmail.js'

import createAd from './ads/createAd.js'
import deleteAd from './ads/deleteAd.js'
import getAds from './ads/getAds.js'

import toggleFavoriteAd from './ads/toggleFavoriteAd.js'
import getFavoriteAds from './ads/getFavoriteAds.js'

import addReview from './ads/addReview.js'
import deleteReview from './ads/deleteReview.js'
import getReviews from './ads/getReviews.js'

const logic = {
  registerUser,
  authenticateUser,
  getUserName,
  changePassword,
  changeEmail,

  createAd,
  deleteAd,
  getAds,

  toggleFavoriteAd,
  getFavoriteAds,

  addReview,
  deleteReview,
  getReviews,
}

export default logic
