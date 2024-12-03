import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'

import { getProductsHandler } from './handlers/index.js'

const productsRouter = Router()

productsRouter.get('/', authorizationHandler, getProductsHandler)

export default productsRouter