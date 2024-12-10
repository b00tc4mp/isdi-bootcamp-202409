import { Router, json } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { createMeetHandler } from './handlers/index.js'

const meetsRouter = Router()

meetsRouter.post('/', jsonBodyParser, createMeetHandler)

export default meetsRouter