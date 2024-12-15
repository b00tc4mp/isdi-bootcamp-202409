import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    createTaskHandler,
    getTasksHandler
} from './handlers/index.js'

const tasksRouter = Router()

tasksRouter.post('/', jsonBodyParser, authorizationHandler, createTaskHandler)
tasksRouter.get('/', authorizationHandler, getTasksHandler)

export default tasksRouter