import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { authenticateUserHandler, registerUserHandler, getUserNameHandler, getUserDatosHandler, updateUserDataHandler, getUsersHandler } from './handlers/index.js'

const usersRouter = Router()

usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/', jsonBodyParser, registerUserHandler)
usersRouter.get('/groups', authorizationHandler, getUsersHandler)
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler)
usersRouter.get('/:targetUserId/datos', authorizationHandler, getUserDatosHandler)
usersRouter.put('/:userId/profile', jsonBodyParser, updateUserDataHandler)

export default usersRouter