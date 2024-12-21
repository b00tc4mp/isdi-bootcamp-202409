import { RequestHandler, Router } from 'express'

import { authorizationHandler } from '../helpers/index.js'

import {
    getAllConditionsHandler
} from './handlers/index.js'

const conditionsRouter = Router()

conditionsRouter.get('/', authorizationHandler as RequestHandler, getAllConditionsHandler)

export default conditionsRouter