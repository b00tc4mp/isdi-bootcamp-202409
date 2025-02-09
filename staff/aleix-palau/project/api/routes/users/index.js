import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    authenticateUserHandler,
    registerUserHandler,
    getUserNameHandler,
    updateUserProfileHandler,
    getUserStageHandler,
    updateUserStageHandler,
    getUserProfileHandler,
    uploadUserPicturesHandler
} from './handlers/index.js'

const usersRouter = Router()

usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/', jsonBodyParser, registerUserHandler)
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler) // per a fer el xat?
usersRouter.patch('/:userId/', jsonBodyParser, authorizationHandler, updateUserProfileHandler)

usersRouter.get('/:userId/stage', authorizationHandler, getUserStageHandler)
usersRouter.patch('/:userId/stage', jsonBodyParser, authorizationHandler, updateUserStageHandler)

usersRouter.get('/:userId/profile', authorizationHandler, getUserProfileHandler)

usersRouter.post('/:userId/pictures', jsonBodyParser, authorizationHandler, uploadUserPicturesHandler)

export default usersRouter