import { RequestHandler, Router } from 'express'

import { authorizationHandler } from '../helpers/index.js'

import {
    getRandomCharacterHandler,
    getCharacterByNameHandler,
    getAllCharactersHandler,
    getAllCharactersNameAndAliasHandler,
    getCharactersByArcHandler
} from './handlers/index.js'

const charactersRouter = Router()

charactersRouter.get('/random', authorizationHandler as RequestHandler, getRandomCharacterHandler)
charactersRouter.get('/names', authorizationHandler as RequestHandler, getAllCharactersNameAndAliasHandler)
charactersRouter.get('/', authorizationHandler as RequestHandler, getAllCharactersHandler)
charactersRouter.get('/:charName', authorizationHandler as RequestHandler, getCharacterByNameHandler)
charactersRouter.get('/names/:arc', authorizationHandler as RequestHandler, getCharactersByArcHandler)

export default charactersRouter