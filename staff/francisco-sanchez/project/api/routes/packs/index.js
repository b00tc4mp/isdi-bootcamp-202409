import { Router, json } from "express"

import { jsonBodyParser, authorizationHandler } from "../helpers/index.js"

import {
    createBasePackHandlers,
    assingPackHandlers,
    getBasePacks,
    getBasePacksDetailsHandler,
    deleteBasePackHandler,
    updateBasePackHandler,
    getAdquiredPacksHandler,
    updatePackHandler
} from './handlers/index.js'

const packsRouter = Router()

packsRouter.post('/create-pack', authorizationHandler, jsonBodyParser, createBasePackHandlers)
packsRouter.post('/assign-pack', authorizationHandler, jsonBodyParser, assingPackHandlers)
packsRouter.get('/get-basepack', authorizationHandler, getBasePacks)
packsRouter.get('/get-basepack-details/:basePackId', getBasePacksDetailsHandler)
packsRouter.delete('/delete/:basePackId', authorizationHandler, deleteBasePackHandler)
packsRouter.put('/update/:basePackId', authorizationHandler, jsonBodyParser, updateBasePackHandler)
packsRouter.put('/updatepack/:packId', authorizationHandler, jsonBodyParser, updatePackHandler)
packsRouter.get('/get-adquired-packs/:targetUserId', authorizationHandler, getAdquiredPacksHandler)

export default packsRouter