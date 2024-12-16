import { Router } from 'express'

import { jsonBodyParser, authorizationHandler } from '../../middleware/index.js'
import {
    registerUserHandler, authenticateUserHandler,
    updateUserProfileHandler, getUserProfileHandler
} from './handlers/index.js'

const usersRouter = Router()

usersRouter.post('/', jsonBodyParser, registerUserHandler)
usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.patch('/profile', authorizationHandler, jsonBodyParser, updateUserProfileHandler)
usersRouter.get('/:targetUserId/profile', authorizationHandler, jsonBodyParser, getUserProfileHandler)

export default usersRouter



