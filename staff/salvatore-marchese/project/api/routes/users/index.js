import { Router } from 'express'

import { jsonBodyParser } from '../helpers/index.js'


import authenticateUserHandler from './authenticateUserHandler.js'

const usersRouter = Router()
//Temp: Usually will be called /login
usersRouter.post('/', jsonBodyParser, authenticateUserHandler)

export default usersRouter