import { RequestHandler, Router } from 'express'

import { authorizationHandler } from '../helpers/index.js'

import {
    getRandomCharacterHandler,
    getCharacterByNameHandler
} from './handlers/index.js'

const charactersRouter = Router()

charactersRouter.get('/random', authorizationHandler as RequestHandler, getRandomCharacterHandler)
charactersRouter.get('/:charName', authorizationHandler as RequestHandler, getCharacterByNameHandler)

export default charactersRouter