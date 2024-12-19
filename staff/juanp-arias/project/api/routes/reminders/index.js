import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    createReminderHandler,
    getRemindersByDateHandler,
    deleteReminderHandler,
    editReminderHandler,
    updateReminderHandler,
    getRemindersHandler
} from './handlers/index.js'

const remindersRouter = Router()

remindersRouter.post('/', jsonBodyParser, authorizationHandler, createReminderHandler)
remindersRouter.get('/:date', authorizationHandler, getRemindersByDateHandler)
remindersRouter.get('/', authorizationHandler, getRemindersHandler)
remindersRouter.get('/edit/:reminderId', authorizationHandler, editReminderHandler)
remindersRouter.delete('/:reminderId', authorizationHandler, deleteReminderHandler)
remindersRouter.put('/:reminderId', authorizationHandler, jsonBodyParser, updateReminderHandler)

export default remindersRouter