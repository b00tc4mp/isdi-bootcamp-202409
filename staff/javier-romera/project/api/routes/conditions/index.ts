import { RequestHandler, Router } from 'express'

import { authorizationHandler } from '../helpers/index.js'

import {
    getRandomConditionsHandler
} from './handlers/index.js'

const conditionsRouter = Router()

conditionsRouter.get('/', authorizationHandler as RequestHandler, getRandomConditionsHandler)

export default conditionsRouter