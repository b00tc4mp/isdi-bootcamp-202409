import { Router, json } from "express"

import { authorizationHandler, jsonBodyParser } from "../helpers/index.js"
import { authenticateUserHandler, registerUserHandler, getUserNameHandler, getCustomersHandler } from "./handlers/index.js"

const usersRouter = Router()

usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/register', jsonBodyParser, registerUserHandler)
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler) //TODO: Diferencia entre esto y la llamada al getBasePacks de packs
usersRouter.get('/customers', getCustomersHandler)

export default usersRouter