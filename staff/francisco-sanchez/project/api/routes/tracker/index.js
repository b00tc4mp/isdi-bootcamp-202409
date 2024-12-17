import { Router, json } from "express";

import { authorizationHandler, jsonBodyParser } from "../helpers/index.js"

import {
    toggleTimeTrackerHandler
} from "./handlers/index.js"

const trackerRouter = Router()

trackerRouter.post('/toggleTimmer', authorizationHandler, jsonBodyParser, toggleTimeTrackerHandler)

export default trackerRouter