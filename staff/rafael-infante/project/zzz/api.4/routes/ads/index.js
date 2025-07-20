import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'

import { createAdHandler, deleteAdHandler } from './handlers/index.js'

const adsRouter = Router()

adsRouter.post('/', jsonBodyParser, authorizationHandler, createAdHandler)

adsRouter.delete('/:adId', authorizationHandler, deleteAdHandler)

export default adsRouter
