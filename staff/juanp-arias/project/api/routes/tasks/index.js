import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    createTaskHandler,
    getTasksHandler,
    getTasksCreatedHandler,
    deleteTaskHandler,
    toggleTaskViewedHandler
} from './handlers/index.js'

const tasksRouter = Router()

tasksRouter.post('/', jsonBodyParser, authorizationHandler, createTaskHandler)
tasksRouter.get('/', authorizationHandler, getTasksHandler)
tasksRouter.patch('/:taskId/viewed', authorizationHandler, toggleTaskViewedHandler)
tasksRouter.get('/teacher', authorizationHandler, getTasksCreatedHandler)
tasksRouter.delete('/:taskId', authorizationHandler, deleteTaskHandler)

export default tasksRouter