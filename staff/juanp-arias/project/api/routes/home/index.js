import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    getLastNoteHandler,
    getRemindersCountHandler,
    getTasksCountHandler
} from './handlers/index.js'

const homeRouter = Router()

homeRouter.get('/reminders', authorizationHandler, getRemindersCountHandler)
homeRouter.get('/tasks', authorizationHandler, getTasksCountHandler)
homeRouter.get('/notes', authorizationHandler, getLastNoteHandler)

export default homeRouter