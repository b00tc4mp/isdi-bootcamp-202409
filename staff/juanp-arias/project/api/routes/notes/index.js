import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    createNoteHandler,
    getNotesHandler,
    deleteNoteHandler
} from './handlers/index.js'

const notesRouter = Router()

notesRouter.post('/', jsonBodyParser, authorizationHandler, createNoteHandler)
notesRouter.get('/', authorizationHandler, getNotesHandler)
notesRouter.delete('/:noteId', authorizationHandler, deleteNoteHandler)

export default notesRouter