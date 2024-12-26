import { RequestHandler, Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { registerPlayerHandler, authenticatePlayerHandler, getPlayerUsernameHandler, createPlayerStateHandler, deletePlayerStateHandler, getPlayerStateHandler } from './handlers/index.js'

const playersRouter = Router()

playersRouter.post('/', jsonBodyParser, registerPlayerHandler)
playersRouter.post('/auth', jsonBodyParser, authenticatePlayerHandler)
playersRouter.get('/:targetPlayerId/username', authorizationHandler as RequestHandler, getPlayerUsernameHandler)
playersRouter.post('/new-state', authorizationHandler as RequestHandler, createPlayerStateHandler)
playersRouter.delete('/state/:playerStateId', authorizationHandler as RequestHandler, deletePlayerStateHandler)
playersRouter.get('/state', authorizationHandler as RequestHandler, getPlayerStateHandler)

export default playersRouter