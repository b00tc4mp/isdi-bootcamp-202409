import { Router, json } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { registerUserHandler, authenticateUserHandler, getUserNameHandler } from './handlers/index.js'

const usersRouter = Router()

usersRouter.post('/', jsonBodyParser, registerUserHandler)
usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler)

export default usersRouter