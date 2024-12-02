import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    addPeriodEndHandler,
    createCycleHandler
} from './handlers/index.js'

const cyclesRouter = Router()

cyclesRouter.post('/', authorizationHandler, jsonBodyParser, createCycleHandler)
cyclesRouter.post('/:cycleId', authorizationHandler, jsonBodyParser, addPeriodEndHandler)

export default cyclesRouter