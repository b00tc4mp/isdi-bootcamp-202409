


import { Router } from 'express'
import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { authenticateUserHandler, getUserNameHandler, registerUserHandler } from './handlers/index.js'

const usersRouter = Router()

usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler)
usersRouter.post('/', jsonBodyParser, registerUserHandler)

export default usersRouter