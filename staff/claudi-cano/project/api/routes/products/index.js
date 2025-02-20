import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import {
    createProductHandler,
    getProductsHandler,
    deleteProductHandler,
    toggleLikeProductHandler,
    addCommentHandler,
    removeCommentHandler,
    getCommentsHandler
} from './handlers/index.js'

const productsRouter = Router()

productsRouter.product('/', jsonBodyParser, authorizationHandler, createProductHandler)
productsRouter.get('/', authorizationHandler, getProductsHandler)
productsRouter.delete('/:productId', authorizationHandler, deleteProductHandler)
productsRouter.patch('/:productId/likes', authorizationHandler, toggleLikeProductHandler)
productsRouter.product('/:productId/comments', authorizationHandler, jsonBodyParser, addCommentHandler)
productsRouter.delete('/:productId/comments/:commentId', authorizationHandler, removeCommentHandler)
productsRouter.get('/:productId/comments', authorizationHandler, getCommentsHandler)

export default productsRouter