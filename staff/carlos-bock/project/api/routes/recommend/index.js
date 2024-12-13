import { Router } from 'express'
import authorizationHandler from '../helpers/authorizationHandler.js'
import jsonBodyParser from '../helpers/jsonBodyParser.js'

import {
    addCommentsHandler,
    createRecommendHandler,
    deleteRecommendHandler,
    downVoteHandler,
    getCommentsHandler,
    getRecommendHandler,
    getRecommendByIdHandler,
    getRecommendByCategoryHandler,
    getRecommendByUserHandler,
    getRecommendByCategoryCountryHandler,
    removeCommentHandler,
    upVoteHandler
} from './handlers/index.js'

const recommendRouter = Router()

recommendRouter.post('/', jsonBodyParser, authorizationHandler, createRecommendHandler)
recommendRouter.get('/', authorizationHandler, getRecommendHandler)
recommendRouter.get('/:recommendId', authorizationHandler, getRecommendByIdHandler)
recommendRouter.delete('/:recommendId', authorizationHandler, deleteRecommendHandler)
recommendRouter.patch('/:recommendId/upVotes', authorizationHandler, upVoteHandler)
recommendRouter.patch('/:recommendId/downVotes', authorizationHandler, downVoteHandler)
recommendRouter.get('/:recommendId/comments', authorizationHandler, getCommentsHandler)
recommendRouter.post('/:recommendId/comments', authorizationHandler, jsonBodyParser, addCommentsHandler)
recommendRouter.delete('/:recommendId/comments/:commentId', authorizationHandler, removeCommentHandler)
recommendRouter.get('/categories/:category', authorizationHandler, getRecommendByCategoryHandler)
recommendRouter.get('/users/:targetUserId', authorizationHandler, getRecommendByUserHandler)
recommendRouter.get('/categories/:category/countries/:country', authorizationHandler, getRecommendByCategoryCountryHandler)



export default recommendRouter