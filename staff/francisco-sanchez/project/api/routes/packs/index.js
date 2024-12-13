import { Router, json } from "express"

import { jsonBodyParser, authorizationHandler } from "../helpers/index.js"

import {
    createPackHandlers,
    assingPackHandlers,
    getBasePacks,
    getBasePacksDetailsHandler,
} from './handlers/index.js'

const packsRouter = Router()

packsRouter.post('/create-pack', authorizationHandler, jsonBodyParser, createPackHandlers)
packsRouter.post('/assign-pack', authorizationHandler, jsonBodyParser, assingPackHandlers)
packsRouter.get('/get-basepack', authorizationHandler, getBasePacks)
packsRouter.get('/get-basepack-details/:basePackId', getBasePacksDetailsHandler)

export default packsRouter