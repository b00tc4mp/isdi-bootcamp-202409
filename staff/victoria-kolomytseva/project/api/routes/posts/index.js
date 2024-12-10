import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    createPostHandler,
    getPostHandler,
    getPostByIdHandler,

} from './handlers/index.js'

const postsRouter = Router()

postsRouter.post('/', jsonBodyParser, authorizationHandler, createPostHandler)
postsRouter.get('/', authorizationHandler, getPostHandler)
postsRouter.get('/:postId', authorizationHandler, getPostByIdHandler)
// postsRouter.delete('/:postId', authorizationHandler, deletePostHandler)

export default postsRouter