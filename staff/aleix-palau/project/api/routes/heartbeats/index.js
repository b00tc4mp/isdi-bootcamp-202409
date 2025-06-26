import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { createHeartbeatHandler } from './handlers/index.js'

const heartbeatsRouter = Router()

heartbeatsRouter.post('/', jsonBodyParser, authorizationHandler, createHeartbeatHandler)

export default heartbeatsRouter