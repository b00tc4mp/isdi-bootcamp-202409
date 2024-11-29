import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpeers/index.js'
import {
    createCommentHandler,
    removeCommentHandler,
    getCommentsHandler,
    createPostHandler,
    deletePostHandler,
    getPostsHandler,
    toggleLikePostHandler
} from './handlers/index.js'

const postsRouter = Router()

postsRouter.get('/', authorizationHandler, getPostsHandler)
postsRouter.get('/:postId/comments', authorizationHandler, getCommentsHandler)
postsRouter.post('/', jsonBodyParser, authorizationHandler, createPostHandler)
postsRouter.post('/:postId/comments', authorizationHandler, jsonBodyParser, createCommentHandler)
postsRouter.delete('/:postId', authorizationHandler, deletePostHandler)
postsRouter.delete('/:postId/comments/:commentId', authorizationHandler, removeCommentHandler)
postsRouter.patch('/:postId/likes', authorizationHandler, toggleLikePostHandler)

export default postsRouter