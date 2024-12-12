import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { authenticateUserHandler, registerUserHandler, getUserHandler, getUserNameHandler, getProfileHandler, updateProfileHandler } from './handlers/index.js'
import logsRouter from '../log/index.js'
import createLogHandler from '../log/handlers/createLogHandler.js'
import getLogsHandler from '../log/handlers/getLogsHandler.js'


const usersRouter = Router()

//Temp: Usually will be called /register
usersRouter.post('/', jsonBodyParser, registerUserHandler)

//Temp: Usually will be called /login
usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)

//Profile
//Temp: Usually will be called /profile
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler)
usersRouter.get('/personal-info', authorizationHandler, getProfileHandler)
usersRouter.put('/:targetUserId', authorizationHandler, updateProfileHandler)

//LogBook
logsRouter.get('/log-book', authorizationHandler, createLogHandler)
logsRouter.post('/log-book-history', authorizationHandler, getLogsHandler)




//usersRouter.get('/:id', authorizationHandler, getUserHandler)



export default usersRouter