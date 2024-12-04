import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'

import {
  getProductsHandler,
  addCommentHandler,
  removeCommentHandler,
  getCommentsHandler
} from './handlers/index.js'


const productsRouter = Router()

productsRouter.get('/', authorizationHandler, getProductsHandler)
productsRouter.post('/:productId/comments', authorizationHandler, jsonBodyParser, addCommentHandler)
productsRouter.delete('/:productId/comments/:commentId', authorizationHandler, removeCommentHandler)
productsRouter.get('/:productId/comments', authorizationHandler, getCommentsHandler)

export default productsRouter