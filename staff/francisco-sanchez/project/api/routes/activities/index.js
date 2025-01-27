import { Router } from "express"

import { authorizationHandler } from "../helpers/index.js"

import {
    getActivityByPackIdHandler,
} from './handlers/index.js'


const activitiesRouter = Router()

activitiesRouter.get('/get-activities/:packId', authorizationHandler, getActivityByPackIdHandler)

export default activitiesRouter