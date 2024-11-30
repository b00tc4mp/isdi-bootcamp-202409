import { Router, json } from 'express'

import { jsonBodyParser } from '../../middleware/index.js'
import { registerUserHandler, authenticateUserHandler } from './handlers/index.js'

const usersRouter = Router()

usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/', jsonBodyParser, registerUserHandler)

export default usersRouter



