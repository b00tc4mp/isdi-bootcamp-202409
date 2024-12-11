import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { createLogHandler, getLogsHandler } from './handlers/index.js'

const logsRouter = Router()

//Index - Get all
logsRouter.get('/', authorizationHandler, getLogsHandler)


//Create - Crete a new log
logsRouter.post('/', authorizationHandler, createLogHandler)


//Update - Update a log
//logsRouter.put('/:id', authorizationHandler, updateLogHandler )


//Delete - Delete a log


export default logsRouter