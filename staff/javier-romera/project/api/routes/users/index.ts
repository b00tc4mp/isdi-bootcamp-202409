import { RequestHandler, Router } from 'express'

import { jsonBodyParser, authorizationHandler } from '../helpers/index.js'
import {
    authenticateUserHandler,
    registerUserHandler,
    registerAnonymousUserHandler,
    getUserUsernameHandler,
    setNewUserStatusHandler,
    getUserStatusHandler,
    getUserScoreHandler,
    updateUserScoreHandler
} from './handlers/index.js'


const usersRouter = Router()

usersRouter.get('/:targetUserId/username', authorizationHandler as RequestHandler, getUserUsernameHandler)
usersRouter.get('/:targetUserId/status', authorizationHandler as RequestHandler, getUserStatusHandler)
usersRouter.get('/:targetUserId/score', authorizationHandler as RequestHandler, getUserScoreHandler)

usersRouter.post('/anonymous', registerAnonymousUserHandler)
usersRouter.post('/auth', authorizationHandler as RequestHandler, jsonBodyParser, authenticateUserHandler)
usersRouter.post('/', authorizationHandler as RequestHandler, jsonBodyParser, registerUserHandler)

usersRouter.patch('/status', authorizationHandler as RequestHandler, jsonBodyParser, setNewUserStatusHandler)
usersRouter.patch('/score', authorizationHandler as RequestHandler, jsonBodyParser, updateUserScoreHandler)

export default usersRouter