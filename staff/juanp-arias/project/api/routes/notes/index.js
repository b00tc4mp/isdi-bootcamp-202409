import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    createNoteHandler,
    getNotesHandler,
    deleteNoteHandler,
    getNoteHandler,
    updateNoteHandler
} from './handlers/index.js'

const notesRouter = Router()

notesRouter.post('/', jsonBodyParser, authorizationHandler, createNoteHandler)
notesRouter.get('/', authorizationHandler, getNotesHandler)
notesRouter.get('/:noteId', authorizationHandler, getNoteHandler)
notesRouter.delete('/:noteId', authorizationHandler, deleteNoteHandler)
notesRouter.put('/:noteId', jsonBodyParser, updateNoteHandler)

export default notesRouter