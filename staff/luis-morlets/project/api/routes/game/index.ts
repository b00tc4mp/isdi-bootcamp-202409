import { RequestHandler, Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { getCharactersHandler, getItemsHandler, getQuestHandler, getCharacterHandler } from './handlers/index.js'

const gameRouter = Router()

gameRouter.get('/characters', authorizationHandler as RequestHandler, getCharactersHandler)
gameRouter.get('/item/:itemId', authorizationHandler as RequestHandler, getItemsHandler)
gameRouter.get('/quests', authorizationHandler as RequestHandler, getQuestHandler)
gameRouter.get('/:characterId', authorizationHandler as RequestHandler, getCharacterHandler)

export default gameRouter