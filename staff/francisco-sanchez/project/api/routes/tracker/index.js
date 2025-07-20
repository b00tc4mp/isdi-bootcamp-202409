import { Router, json } from "express";

import { authorizationHandler, jsonBodyParser } from "../helpers/index.js"

import {
    toggleTimeTrackerHandler,
    toggleManualTimeTrackerHandler,
    toggleManualUnitsTrackerHandler,
} from "./handlers/index.js"

const trackerRouter = Router()

trackerRouter.post('/toggleTimmer', authorizationHandler, jsonBodyParser, toggleTimeTrackerHandler)
trackerRouter.post('/toggleManualTime', authorizationHandler, jsonBodyParser, toggleManualTimeTrackerHandler)
trackerRouter.post('/toggleManualUnits', authorizationHandler, jsonBodyParser, toggleManualUnitsTrackerHandler)

export default trackerRouter