import { Router, json } from 'express'

import authorizationHandler from '../helpers/authorizationHandler.js' ////import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import jsonBodyParser from '../helpers/jsonBodyParser.js'; import authenticateUserHandler from './handlers/authenticateUserHandler.js' //import { authenticateUserHandler, registerUserHandler, getUserNameHandler } from './handlers/index.js'
import registerUserHandler from './handlers/registerUserHandler.js'; import getUserNameHandler from './handlers/getUserNameHandler.js'

const usersRouter = Router()

usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/', jsonBodyParser, registerUserHandler)
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler)


export default usersRouter