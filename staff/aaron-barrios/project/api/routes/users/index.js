import { Router, json } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { registerUserHandler, authenticateUserHandler } from './handlers/index.js'

const usersRouter = Router()

usersRouter.post('/', jsonBodyParser, registerUserHandler)
usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)

export default usersRouter