import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { getUserMatchesHandler, getMatchMessagesHandler, sendMessageHandler, unmatchUserHandler } from './handlers/index.js'

const matchesRouter = Router()

// Get all matches for the current user
matchesRouter.get('/', authorizationHandler, getUserMatchesHandler)

// Get messages for a specific match
matchesRouter.get('/:matchId/messages', authorizationHandler, getMatchMessagesHandler)

// Send a message in a match
matchesRouter.post('/:matchId/messages', jsonBodyParser, authorizationHandler, sendMessageHandler)

// Unmatch a user
matchesRouter.delete('/:matchId', authorizationHandler, unmatchUserHandler)

export default matchesRouter