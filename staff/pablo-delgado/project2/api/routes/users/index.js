import { Router, json } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { authenticateUserHandler, registerUserHandler, getUserNameHandler } from './handlers/index.js'

const usersRouter = Router()

usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/', jsonBodyParser, registerUserHandler)
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler)

export default usersRouter