import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    createPostHandler,
    getPostsHandler,
    deletePostHandler,
    toggleLikePostHandler,
    addCommentHandler,
    removeCommentHandler,
    getCommentsHandler,
    savePostHandler,
    getSavedPostsHandler
} from './handlers/index.js'

const postsRouter = Router()

postsRouter.post('/', jsonBodyParser, authorizationHandler, createPostHandler)
postsRouter.get('/', authorizationHandler, getPostsHandler)
postsRouter.get('/saved', authorizationHandler, getSavedPostsHandler)
postsRouter.delete('/:postId', authorizationHandler, deletePostHandler)
postsRouter.patch('/:postId/likes', authorizationHandler, toggleLikePostHandler)
postsRouter.patch('/:postId/save', authorizationHandler, savePostHandler)
postsRouter.post('/:postId/comments', authorizationHandler, jsonBodyParser, addCommentHandler)
postsRouter.delete('/:postId/comments/:commentId', authorizationHandler, removeCommentHandler)
postsRouter.get('/:postId/comments', authorizationHandler, getCommentsHandler)

export default postsRouter