import { Router, json } from "express"

import { authorizationHandler, jsonBodyParser } from "../helpers/index.js"
import { authenticateUserHandler, registerUserHandler } from "./handlers/index.js"

const usersRouter = Router()

usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.post('/register', jsonBodyParser, registerUserHandler)

export default usersRouter