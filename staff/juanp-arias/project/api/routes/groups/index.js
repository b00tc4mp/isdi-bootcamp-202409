import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    createGroupHandler,
    getGroupsHandler,
    deleteGroupHandler
} from './handlers/index.js'

const groupsRouter = Router()

groupsRouter.post('/', jsonBodyParser, authorizationHandler, createGroupHandler)
groupsRouter.get('/', authorizationHandler, getGroupsHandler)
groupsRouter.delete('/:groupId', authorizationHandler, deleteGroupHandler)

export default groupsRouter