import { Router } from 'express'
import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'

import {
  authenticateUserHandler,
  registerUserHandler,
  getUserNameHandler,
  changePasswordHandler,
  changeEmailHandler,
} from './handlers/index.js'

const usersRouter = Router()

usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/', jsonBodyParser, registerUserHandler)
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler)
usersRouter.post('/changePassword', jsonBodyParser, authorizationHandler, changePasswordHandler)
usersRouter.post('/changeEmail', jsonBodyParser, authorizationHandler, changeEmailHandler)

export default usersRouter
