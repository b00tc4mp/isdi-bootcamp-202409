import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    createReminderHandler,
    getCurrentRemindersHandler
} from './handlers/index.js'

const remindersRouter = Router()

remindersRouter.get('/day/:todayDate', authorizationHandler, getCurrentRemindersHandler)
remindersRouter.post('/:formattedDate', authorizationHandler, jsonBodyParser, createReminderHandler)

export default remindersRouter