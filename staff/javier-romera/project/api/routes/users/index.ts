import { RequestHandler, Router } from 'express'

import { jsonBodyParser, authorizationHandler } from '../helpers/index.js'
import {
    authenticateUserHandler,
    registerUserHandler,
    registerAnonymousUserHandler,
    getUserUsernameHandler
} from './handlers/index.js'

const usersRouter = Router()

usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/', jsonBodyParser, registerUserHandler)
usersRouter.post('/anonymous', registerAnonymousUserHandler)
usersRouter.get('/:targetUserId/username', authorizationHandler as RequestHandler, getUserUsernameHandler)

export default usersRouter