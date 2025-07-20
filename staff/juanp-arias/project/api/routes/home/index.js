import { Router } from 'express'

import { authorizationHandler } from '../helpers/index.js'
import {
    getLastNoteHandler,
    getRemindersCountHandler,
    getTasksCountHandler,
    getTasksCreatedCountHandler
} from './handlers/index.js'

const homeRouter = Router()

homeRouter.get('/reminders', authorizationHandler, getRemindersCountHandler)
homeRouter.get('/tasks', authorizationHandler, getTasksCountHandler)
homeRouter.get('/notes', authorizationHandler, getLastNoteHandler)
homeRouter.get('/teacher', authorizationHandler, getTasksCreatedCountHandler)
export default homeRouter