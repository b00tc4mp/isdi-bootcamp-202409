import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    authenticateUserHandler,
    registerUserHandler,
    getUserStageHandler,
    updateUserStageHandler,
    getUserProfileHandler,
    updateUserProfileHandler,
    uploadUserPicturesHandler,
    deleteUserPictureHandler,
    getUserNameHandler
} from './handlers/index.js'

const usersRouter = Router()

// Public routes
usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/', jsonBodyParser, registerUserHandler)

// Protected routes for user's own data
usersRouter.get('/stage', authorizationHandler, getUserStageHandler)
usersRouter.patch('/stage', jsonBodyParser, authorizationHandler, updateUserStageHandler)

usersRouter.get('/profile', authorizationHandler, getUserProfileHandler)
usersRouter.patch('/profile', jsonBodyParser, authorizationHandler, updateUserProfileHandler)

usersRouter.post('/pictures', jsonBodyParser, authorizationHandler, uploadUserPicturesHandler)
usersRouter.delete('/pictures', jsonBodyParser, authorizationHandler, deleteUserPictureHandler)

// Protected routes for accessing other users' data
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler) // TODO: to show a user's name in the chat component? maybe delete w/ logic as well

export default usersRouter