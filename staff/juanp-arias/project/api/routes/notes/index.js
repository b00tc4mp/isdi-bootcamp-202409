import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    createNoteHandler,
    getNotesHandler,
} from './handlers/index.js'

const notesRouter = Router()

notesRouter.post('/', jsonBodyParser, authorizationHandler, createNoteHandler)
notesRouter.get('/', authorizationHandler, getNotesHandler)

export default notesRouter