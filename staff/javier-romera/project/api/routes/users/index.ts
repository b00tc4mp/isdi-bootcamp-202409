import { RequestHandler, Router } from 'express'

import { jsonBodyParser, authorizationHandler } from '../helpers/index.js'
import {
    authenticateUserHandler,
    registerUserHandler,
    registerAnonymousUserHandler,
    getUserUsernameHandler,
    setNewUserStatusHandler,
    getUserStatusHandler,
    deleteAnonymousUserHandler,
    getUserScoreHandler,
    updateUserScoreHandler
} from './handlers/index.js'


const usersRouter = Router()

usersRouter.get('/:targetUserId/username', authorizationHandler as RequestHandler, getUserUsernameHandler)
usersRouter.get('/:targetUserId/status', authorizationHandler as RequestHandler, getUserStatusHandler)
usersRouter.get('/:targetUserId/score', authorizationHandler as RequestHandler, getUserScoreHandler)

usersRouter.post('/anonymous', registerAnonymousUserHandler)
usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/', authorizationHandler as RequestHandler, jsonBodyParser, registerUserHandler)

usersRouter.delete('/anonymous', authorizationHandler as RequestHandler, deleteAnonymousUserHandler)

usersRouter.patch('/status', authorizationHandler as RequestHandler, jsonBodyParser, setNewUserStatusHandler)
usersRouter.patch('/score', authorizationHandler as RequestHandler, jsonBodyParser, updateUserScoreHandler)

export default usersRouter