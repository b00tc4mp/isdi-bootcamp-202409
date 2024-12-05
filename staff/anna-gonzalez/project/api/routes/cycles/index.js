import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    addPeriodEndHandler,
    createCycleHandler,
    getPeriodDaysHandler
} from './handlers/index.js'

const cyclesRouter = Router()

cyclesRouter.post('/', authorizationHandler, jsonBodyParser, createCycleHandler)
cyclesRouter.post('/periodDays', authorizationHandler, jsonBodyParser, getPeriodDaysHandler)
cyclesRouter.post('/periodEnd', authorizationHandler, jsonBodyParser, addPeriodEndHandler)

export default cyclesRouter