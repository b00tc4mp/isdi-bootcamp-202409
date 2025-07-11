import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { authenticateUserHandler, registerUserHandler, getUserNameHandler, changeUserEmailHandler, changeUserPasswordHandler } from '../users/user-handler/index.js'

const usersRouter = Router()

usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/', jsonBodyParser, registerUserHandler)
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler)
usersRouter.patch('/email', authorizationHandler, jsonBodyParser, changeUserEmailHandler);
usersRouter.patch('/password', authorizationHandler, jsonBodyParser, changeUserPasswordHandler);

//usersRouter.post('/:userId/pets', authorizationHandler, jsonBodyParser, addPetToUser)

export { usersRouter }