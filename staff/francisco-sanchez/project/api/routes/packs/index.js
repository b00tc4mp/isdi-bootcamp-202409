import { Router, json } from "express"

import { jsonBodyParser } from "../helpers/index.js"

import { createPackHandlers, assingPackHandlers, getBasePacks } from './handlers/index.js'

const packsRouter = Router()


packsRouter.post('/create-pack', jsonBodyParser, createPackHandlers)
packsRouter.post('/assign-pack', jsonBodyParser, assingPackHandlers)
packsRouter.get('/get-basepack', jsonBodyParser, getBasePacks)

export default packsRouter