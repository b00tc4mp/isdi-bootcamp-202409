import { Router, json } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { registerUserHandler } from './handlers/index.js'

const usersRouter = Router()

usersRouter.post('/', jsonBodyParser, registerUserHandler)

export default usersRouter