import authenticateUser from './users/authenticateUser.js'
import registerUser from './users/registerUser.js'
import getUserName from './users/getUserName.js'

import createAd from './ads/createAd.js'
import deleteAd from './ads/deleteAd.js'
import getAds from './ads/getAds.js'

import addReview from './ads/addReview.js'
import deleteReview from './ads/deleteReview.js'
import getReviews from './ads/getReviews.js'

const logic = {
  registerUser,
  authenticateUser,
  getUserName,

  createAd,
  deleteAd,
  getAds,

  addReview,
  deleteReview,
  getReviews,
}

export default logic
