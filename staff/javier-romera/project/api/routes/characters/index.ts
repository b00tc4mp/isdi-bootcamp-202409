import { RequestHandler, Router } from 'express'

import { authorizationHandler } from '../helpers/index.js'

import {
    getRandomCharacterHandler
} from './handlers/index.js'

const charactersRouter = Router()

charactersRouter.get('/random', authorizationHandler as RequestHandler, getRandomCharacterHandler)

export default charactersRouter