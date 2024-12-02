import { Router } from 'express'

import { jsonBodyParser } from '../helpers/index.js'
import { authenticateUserHandler, registerUserHandler } from './handlers/index.js'

const usersRouter = Router()

usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/', jsonBodyParser, registerUserHandler)

export default usersRouter