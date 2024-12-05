import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'

import { createAdHandler, deleteAdHandler, getAdsHandler, addReviewHandler } from './handlers/index.js'

const adsRouter = Router()

adsRouter.post('/', jsonBodyParser, authorizationHandler, createAdHandler)

adsRouter.get('/', authorizationHandler, getAdsHandler)

adsRouter.delete('/:adId', authorizationHandler, deleteAdHandler)

adsRouter.post('/:adId/reviews', jsonBodyParser, authorizationHandler, addReviewHandler)

export default adsRouter
