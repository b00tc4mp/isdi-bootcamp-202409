import { Router, json } from 'express'

//import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import authorizationHandler from '../helpers/authorizationHandler.js'
import jsonBodyParser from '../helpers/jsonBodyParser.js'
import { authenticateUserHandler, registerUserHandler, getUserNameHandler } from './handlers/index.js'

const usersRouter = Router()

//usersRouter.recommend('/auth', jsonBodyParser, authenticateUserHandler)
//usersRouter.recommend('/', jsonBodyParser, registerUserHandler)
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler)

export default usersRouter