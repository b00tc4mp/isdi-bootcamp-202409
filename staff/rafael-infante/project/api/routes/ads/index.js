import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'

import {
  createAdHandler,
  deleteAdHandler,
  getAdsHandler,
  addReviewHandler,
  deleteReviewHandler,
  getReviewsHandler,
  toggleFavoriteAdHandler,
  getFavoriteAdsHandler,
} from './handlers/index.js'

const adsRouter = Router()

adsRouter.post('/', jsonBodyParser, authorizationHandler, createAdHandler)

adsRouter.get('/', authorizationHandler, getAdsHandler)

adsRouter.delete('/:adId', authorizationHandler, deleteAdHandler)

adsRouter.post('/:adId/reviews', jsonBodyParser, authorizationHandler, addReviewHandler)
adsRouter.delete('/:adId/reviews/:reviewId', authorizationHandler, deleteReviewHandler)
adsRouter.get('/:adId/reviews', authorizationHandler, getReviewsHandler)
adsRouter.patch('/:adId/favorites', authorizationHandler, toggleFavoriteAdHandler)

adsRouter.get('/favorites', authorizationHandler, getFavoriteAdsHandler)

export default adsRouter
