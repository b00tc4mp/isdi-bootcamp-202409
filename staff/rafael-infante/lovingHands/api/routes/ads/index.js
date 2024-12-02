import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'

import { createAdHandler } from './handlers/index.js'

const adsRouter = Router()

adsRouter.post('/', jsonBodyParser, authorizationHandler, createAdHandler)

export default adsRouter
