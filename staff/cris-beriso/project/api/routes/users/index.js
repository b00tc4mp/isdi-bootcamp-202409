import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { registerUserHandler, authenticateUserHandler, getWishlistHandler } from './handlers/index.js'

const usersRouter = Router()

usersRouter.post('/', jsonBodyParser, registerUserHandler)
usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.get('/wishlist', authorizationHandler, getWishlistHandler)

export default usersRouter