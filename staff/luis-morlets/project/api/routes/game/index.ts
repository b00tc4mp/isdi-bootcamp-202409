import { RequestHandler, Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { getCharactersHandler, getItemsHandler, getQuestHandler } from './handlers/index.js'

const gameRouter = Router()

gameRouter.get('/:playerId/:characterId', authorizationHandler as RequestHandler, getCharactersHandler)
gameRouter.get('/:playerId/item/:itemId', authorizationHandler as RequestHandler, getItemsHandler)
gameRouter.get('/:playerId/quests', authorizationHandler as RequestHandler, getQuestHandler)

export default gameRouter