import { Router, json } from "express"

import { authorizationHandler, jsonBodyParser } from "../helpers/index.js"
import {
    authenticateUserHandler,
    registerUserHandler,
    getUserNameHandler,
    getCustomersHandler,
    getUserDetailsHandler,
    updateUserHandler,
    getCustomerPacksHandler
} from "./handlers/index.js"

const usersRouter = Router()

usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/register', jsonBodyParser, registerUserHandler)
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler)
usersRouter.get('/customers', authorizationHandler, getCustomersHandler)
usersRouter.get('/customerpacks/:customerId', authorizationHandler, getCustomerPacksHandler)
usersRouter.get('/user/:targetUserId', authorizationHandler, getUserDetailsHandler)
usersRouter.put('/update/:targetUserId', authorizationHandler, jsonBodyParser, updateUserHandler)
//usersRouter.get('/images/profile:imageUrl')
//server.use('/images/profile', express.static('public/images/profile'))

export default usersRouter