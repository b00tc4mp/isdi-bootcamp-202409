import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    createReminderHandler,
    getRemindersHandler
} from './handlers/index.js'

const remindersRouter = Router()

remindersRouter.post('/', jsonBodyParser, authorizationHandler, createReminderHandler)
remindersRouter.get('/', authorizationHandler, getRemindersHandler)

export default remindersRouter