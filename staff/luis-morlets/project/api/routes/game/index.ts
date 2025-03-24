import { RequestHandler, Router } from 'express'

import { authorizationHandler } from '../helpers/index.js'
import { getCharactersHandler, getItemsHandler, getQuestHandler, getCharacterHandler, addCharacterHandler, removeCharacterHandler, getCharacterByUuidHandler, createGameStateHandler } from './handlers/index.js'

const gameRouter = Router()

gameRouter.get('/characters', authorizationHandler as RequestHandler, getCharactersHandler)
gameRouter.get('/item/:itemId', authorizationHandler as RequestHandler, getItemsHandler)
gameRouter.get('/quests', authorizationHandler as RequestHandler, getQuestHandler)
gameRouter.post('/:playerStateId/game-state', authorizationHandler as RequestHandler, createGameStateHandler)
gameRouter.get('/character/:characterId', authorizationHandler as RequestHandler, getCharacterHandler)
gameRouter.get('/character-uuid/:characterUuid', authorizationHandler as RequestHandler, getCharacterByUuidHandler)
gameRouter.delete('/:playerStateId/:characterId', authorizationHandler as RequestHandler, removeCharacterHandler)
gameRouter.post('/:playerStateId/:characterId', authorizationHandler as RequestHandler, addCharacterHandler)

export default gameRouter