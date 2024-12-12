import { Router, json } from "express"

import { jsonBodyParser } from "../helpers/index.js"

import { createPackHandlers, assingPackHandlers, getBasePacks, getBasePacksDetailsHandler } from './handlers/index.js'

const packsRouter = Router()


packsRouter.post('/create-pack', jsonBodyParser, createPackHandlers)
packsRouter.post('/assign-pack', jsonBodyParser, assingPackHandlers)
packsRouter.get('/get-basepack', getBasePacks)
packsRouter.get('/get-basepack-details/:basePackId', getBasePacksDetailsHandler)

export default packsRouter