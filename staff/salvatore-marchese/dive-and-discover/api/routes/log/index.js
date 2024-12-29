import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { createLogHandler, getLogsHandler, updateLogHandler, deleteLogHandler } from './handlers/index.js'

const logsRouter = Router()

//Index - Get all
logsRouter.get('/users/diver/logbook-history', authorizationHandler, getLogsHandler)


//Create - Crete a new log
logsRouter.post('/users/diver/log-book', authorizationHandler, createLogHandler)


//Update - Update a log 
logsRouter.put('/:id', authorizationHandler, updateLogHandler )


//Delete - Delete a log
logsRouter.delete('/:logbookId', authorizationHandler, deleteLogHandler)


export default logsRouter