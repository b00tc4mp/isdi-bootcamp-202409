import { RequestHandler, Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { registerPlayerHandler, authenticatePlayerHandler, getPlayerUsernameHandler } from './handlers/index.js'

const playersRouter = Router()

playersRouter.post('/', jsonBodyParser, registerPlayerHandler)
playersRouter.post('/auth', jsonBodyParser, authenticatePlayerHandler)
playersRouter.get('/:targetPlayerId/username', authorizationHandler as RequestHandler, getPlayerUsernameHandler)

export default playersRouter