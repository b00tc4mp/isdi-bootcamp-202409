import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    createPostHandler,
    getPostHandler

} from './handlers/index.js'

const postsRouter = Router()

postsRouter.post('/', jsonBodyParser, authorizationHandler, createPostHandler)
postsRouter.get('/', authorizationHandler, getPostHandler)
// postsRouter.delete('/:postId', authorizationHandler, deletePostHandler)

export default postsRouter