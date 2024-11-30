import { Router, json } from "express"

import { authorizationHandler, jsonBodyParser } from "../helpers/index.js"

import {
  createEventHandler,
  deleteEventHandler,
  getEventsHandler,
} from "./handlers/index.js"

const eventsRouter = Router()

eventsRouter.post("/", jsonBodyParser, authorizationHandler, createEventHandler)
eventsRouter.delete("/:eventId", authorizationHandler, deleteEventHandler)
eventsRouter.get("/", authorizationHandler, getEventsHandler)

export default eventsRouter
