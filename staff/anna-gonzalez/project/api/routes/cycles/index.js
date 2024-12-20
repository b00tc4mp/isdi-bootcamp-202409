import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    addPeriodEndHandler,
    createCycleHandler,
    createDayLogHandler,
    deleteCycleHandler,
    getCyclesDetailsHandler,
    getCyclesStartHandler,
    getCurrentCycleStartHandler,
    getCurrentDayLogHandler,
    getPeriodDaysHandler
} from './handlers/index.js'

const cyclesRouter = Router()

cyclesRouter.get('/start', authorizationHandler, getCyclesStartHandler)
cyclesRouter.post('/', authorizationHandler, jsonBodyParser, createCycleHandler)
cyclesRouter.delete('/:start', authorizationHandler, deleteCycleHandler)
cyclesRouter.get('/details', authorizationHandler, getCyclesDetailsHandler)
cyclesRouter.post('/daylog/:formattedDate', authorizationHandler, jsonBodyParser, createDayLogHandler)
cyclesRouter.get('/daylog/:formattedDate', authorizationHandler, getCurrentDayLogHandler)
cyclesRouter.get('/currentCycle', authorizationHandler, getCurrentCycleStartHandler)
cyclesRouter.get('/periodDays', authorizationHandler, getPeriodDaysHandler)
cyclesRouter.post('/periodEnd', authorizationHandler, jsonBodyParser, addPeriodEndHandler)

export default cyclesRouter