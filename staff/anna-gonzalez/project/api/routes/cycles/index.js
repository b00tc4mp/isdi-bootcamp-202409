import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    addPeriodEndHandler,
    createCycleHandler
} from './handlers/index.js'

const cyclesRouter = Router()

cyclesRouter.post('/start', authorizationHandler, jsonBodyParser, createCycleHandler)
cyclesRouter.post('/periodEnd', authorizationHandler, jsonBodyParser, addPeriodEndHandler)

export default cyclesRouter