import { Router, json } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpeers/index.js'
import { authenticateUserHandler, registerUserHandler, getUserNameHandler } from './handlers/index.js'

const usersRouter = Router()

//PETICIÓN DEL ID DEL USUARIO -> MÉTODO AUTHENTICATE
usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)

usersRouter.post('/', jsonBodyParser, registerUserHandler)

//SE PONE : PORQUE ESE USER ID VA IR CAMBIANDO (TIENE PARÁMETROS) -> ES DINÁMICO
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler)

export default usersRouter