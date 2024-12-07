import { Router, json } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { authenticateUserHandler, registerUserHandler, saveUserHandler, getUserHandler } from './handlers/index.js'

const usersRouter = Router()

usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/', jsonBodyParser, registerUserHandler)
usersRouter.put('/', jsonBodyParser, saveUserHandler)
usersRouter.get('/:targetUserId', authorizationHandler, getUserHandler)

export default usersRouter