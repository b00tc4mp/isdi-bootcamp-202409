import { RequestHandler, Router } from 'express'

import { jsonBodyParser, authorizationHandler } from '../helpers/index.js'
import {
    authenticateUserHandler,
    registerUserHandler,
    registerAnonymousUserHandler,
    getUserUsernameHandler,
    setNewUserStatusHandler
} from './handlers/index.js'

const usersRouter = Router()

usersRouter.get('/:targetUserId/username', authorizationHandler as RequestHandler, getUserUsernameHandler)

usersRouter.post('/', authorizationHandler as RequestHandler, jsonBodyParser, registerUserHandler)
usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/anonymous', registerAnonymousUserHandler)

usersRouter.post('/status', authorizationHandler as RequestHandler, jsonBodyParser, setNewUserStatusHandler)

export default usersRouter