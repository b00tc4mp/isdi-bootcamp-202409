import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    addPeriodEndHandler,
    createCycleHandler,
    getLastCycleStartHandler,
    getPeriodDaysHandler
} from './handlers/index.js'

const cyclesRouter = Router()

cyclesRouter.post('/', authorizationHandler, jsonBodyParser, createCycleHandler)
cyclesRouter.get('/lastCycle', authorizationHandler, getLastCycleStartHandler)
cyclesRouter.post('/periodDays', authorizationHandler, jsonBodyParser, getPeriodDaysHandler)
cyclesRouter.post('/periodEnd', authorizationHandler, jsonBodyParser, addPeriodEndHandler)

export default cyclesRouter