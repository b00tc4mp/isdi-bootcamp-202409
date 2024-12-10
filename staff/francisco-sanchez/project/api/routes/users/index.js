import { Router, json } from "express"

import { authorizationHandler, jsonBodyParser } from "../helpers/index.js"
import {
    authenticateUserHandler,
    registerUserHandler,
    getUserNameHandler,
    getCustomersHandler,
    findUserByEmailHandler,
    findUserByUsernameHandler
} from "./handlers/index.js"

const usersRouter = Router()

usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/register', jsonBodyParser, registerUserHandler)
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler)
usersRouter.get('/customers', getCustomersHandler)
usersRouter.get('/findbyemail/:email', authorizationHandler, findUserByEmailHandler)
usersRouter.get('/findbyusername/:username', authorizationHandler, findUserByUsernameHandler)

export default usersRouter