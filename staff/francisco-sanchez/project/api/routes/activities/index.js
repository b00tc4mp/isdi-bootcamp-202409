import { Router, json } from "express"

import { jsonBodyParser, authorizationHandler } from "../helpers/index.js"

import {
    getActivityByPackIdHandler,
} from './handlers/index.js'


const activitiesRouter = Router()

activitiesRouter.get('/get-activities/:packId', authorizationHandler, getActivityByPackIdHandler)

export default activitiesRouter