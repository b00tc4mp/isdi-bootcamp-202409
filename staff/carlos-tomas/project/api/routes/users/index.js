import { Router, json } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'

import { authencateUsersHandler, getUserHandler, getUserPetsHandler, registerUserHandler } from './handlers/index.js'

const usersRouter = Router()

usersRouter.post('/auth', jsonBodyParser, authencateUsersHandler)
usersRouter.post('/register', jsonBodyParser, registerUserHandler)
usersRouter.get('/', authorizationHandler, getUserHandler)
usersRouter.get('/pets', authorizationHandler, getUserPetsHandler)


export default usersRouter