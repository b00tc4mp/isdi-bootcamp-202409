import { Router, json } from "express"

import { authorizationHandler, jsonBodyParser } from "../helpers/index.js"
import {
    authenticateUserHandler,
    registerUserHandler,
    getUserNameHandler,
    getCustomersHandler,
    getUserDetailsHandler
} from "./handlers/index.js"

const usersRouter = Router()

usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/register', jsonBodyParser, registerUserHandler)
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler)
usersRouter.get('/customers', authorizationHandler, getCustomersHandler)
usersRouter.get('/user/:targetUserId', authorizationHandler, getUserDetailsHandler)


export default usersRouter