import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    createPostHandler,
    getPostHandler,
    getPostByIdHandler,
    deletePostHandler,
    addCommentHandler,
    removeCommentHandler,
    getCommentsHandler,
    toggleLikePostHandler,
    petFoundHandler
} from './handlers/index.js'

const postsRouter = Router()

postsRouter.post('/', jsonBodyParser, authorizationHandler, createPostHandler)
postsRouter.get('/', authorizationHandler, getPostHandler)
postsRouter.get('/:postId', authorizationHandler, getPostByIdHandler)
postsRouter.delete('/:postId', authorizationHandler, deletePostHandler)
postsRouter.post('/:postId/comments', authorizationHandler, jsonBodyParser, addCommentHandler)
postsRouter.delete('/:postId/comments/:commentId', authorizationHandler, removeCommentHandler)
postsRouter.get('/:postId/comments', authorizationHandler, getCommentsHandler)
postsRouter.patch('/:postId/likes', authorizationHandler, toggleLikePostHandler)
postsRouter.patch('/:postId/found', authorizationHandler, petFoundHandler)

export default postsRouter