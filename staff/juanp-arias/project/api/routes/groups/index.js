import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    createGroupHandler,
    getGroupsHandler
} from './handlers/index.js'

const groupsRouter = Router()

groupsRouter.post('/', jsonBodyParser, authorizationHandler, createGroupHandler)
groupsRouter.get('/', authorizationHandler, getGroupsHandler)
export default groupsRouter