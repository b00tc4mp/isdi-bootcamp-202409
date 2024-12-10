import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { authenticateUserHandler, registerUserHandler, getUserHandler } from './handlers/index.js'


import getUserHandler from './handlers/getUserHandler.js'

const usersRouter = Router()

usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/', jsonBodyParser, registerUserHandler)
usersRouter.get('/:id', authorizationHandler, getUserHandler)
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserHandler)
usersRouter.get('/personal-info', authorizationHandler, getUserHandler)


export default usersRouter