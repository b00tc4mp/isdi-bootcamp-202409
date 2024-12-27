import { RequestHandler, Router } from 'express'

import { jsonBodyParser, authorizationHandler } from '../helpers/index.js'
import {
    authenticateUserHandler,
    registerUserHandler,
    registerAnonymousUserHandler,
    getUserUsernameHandler,
    setNewUserStatusHandler,
    getUserStatusHandler,
    getUserDetailsHandler,
    updateUserScoreHandler,
    getRankingScoresHandler,
    updateUserProfileHandler
} from './handlers/index.js'


const usersRouter = Router()

usersRouter.get('/:targetUserId/username', authorizationHandler as RequestHandler, getUserUsernameHandler)
usersRouter.get('/:targetUserId/status', authorizationHandler as RequestHandler, getUserStatusHandler)
usersRouter.get('/:targetUserId/score', authorizationHandler as RequestHandler, getUserDetailsHandler)
usersRouter.get('/scores/:rankingLength', authorizationHandler as RequestHandler, getRankingScoresHandler)

usersRouter.post('/anonymous', registerAnonymousUserHandler)
usersRouter.post('/auth', authorizationHandler as RequestHandler, jsonBodyParser, authenticateUserHandler)
usersRouter.post('/', authorizationHandler as RequestHandler, jsonBodyParser, registerUserHandler)
usersRouter.post('/profile', authorizationHandler as RequestHandler, jsonBodyParser, updateUserProfileHandler)

usersRouter.patch('/status', authorizationHandler as RequestHandler, jsonBodyParser, setNewUserStatusHandler)
usersRouter.patch('/score', authorizationHandler as RequestHandler, jsonBodyParser, updateUserScoreHandler)

export default usersRouter