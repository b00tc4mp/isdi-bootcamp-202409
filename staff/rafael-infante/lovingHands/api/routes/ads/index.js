import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'

import { createAdHandler, deleteAdHandler, getAdsHandler } from './handlers/index.js'

const adsRouter = Router()

adsRouter.post('/', jsonBodyParser, authorizationHandler, createAdHandler)

adsRouter.get('/', authorizationHandler, getAdsHandler)

adsRouter.delete('/:adId', authorizationHandler, deleteAdHandler)

export default adsRouter
