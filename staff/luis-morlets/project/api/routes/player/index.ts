import { RequestHandler, Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { registerPlayerHandler, authenticatePlayerHandler, getPlayerUsernameHandler, createPlayerStateHandler, deletePlayerHandler } from './handlers/index.js'

const playersRouter = Router()

playersRouter.post('/', jsonBodyParser, registerPlayerHandler)
playersRouter.post('/auth', jsonBodyParser, authenticatePlayerHandler)
playersRouter.get('/:targetPlayerId/username', authorizationHandler as RequestHandler, getPlayerUsernameHandler)
playersRouter.post('/', authorizationHandler as RequestHandler, createPlayerStateHandler)
playersRouter.delete('/:playerStateId', authorizationHandler as RequestHandler, deletePlayerHandler)

export default playersRouter