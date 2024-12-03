import { Router, json } from "express"

import { jsonBodyParser } from "../helpers/index.js"

import { createPackHandlers } from './handlers/index.js'

const packsRouter = Router()


packsRouter.post('/create-pack', jsonBodyParser, createPackHandlers)

export default packsRouter