import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    addPeriodEndHandler,
    createCycleHandler,
    getCyclesStartHandler,
    getCurrentCycleStartHandler,
    getPeriodDaysHandler
} from './handlers/index.js'

const cyclesRouter = Router()

cyclesRouter.get('/start', authorizationHandler, getCyclesStartHandler)
cyclesRouter.post('/', authorizationHandler, jsonBodyParser, createCycleHandler)
cyclesRouter.get('/currentCycle', authorizationHandler, getCurrentCycleStartHandler)
cyclesRouter.post('/periodDays', authorizationHandler, jsonBodyParser, getPeriodDaysHandler)
cyclesRouter.post('/periodEnd', authorizationHandler, jsonBodyParser, addPeriodEndHandler)

export default cyclesRouter