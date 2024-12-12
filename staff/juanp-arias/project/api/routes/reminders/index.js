import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    createReminderHandler,
    getRemindersHandler,
    deleteReminderHandler,
    getReminderHandler,
    updateReminderHandler
} from './handlers/index.js'

const remindersRouter = Router()

remindersRouter.post('/', jsonBodyParser, authorizationHandler, createReminderHandler)
remindersRouter.get('/:date', authorizationHandler, getRemindersHandler)
remindersRouter.get('/reminder/:reminderId', authorizationHandler, getReminderHandler)
remindersRouter.delete('/:reminderId', authorizationHandler, deleteReminderHandler)
remindersRouter.put('/reminder/:reminderId', authorizationHandler, jsonBodyParser, updateReminderHandler)

export default remindersRouter