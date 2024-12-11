import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    createReminderHandler
} from './handlers/index.js'

const remindersRouter = Router()

remindersRouter.post('/:formattedDate', authorizationHandler, jsonBodyParser, createReminderHandler)

export default remindersRouter