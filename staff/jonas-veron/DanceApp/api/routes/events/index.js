import { Router, json } from "express"

import { authorizationHandler, jsonBodyParser } from "../helpers/index.js"

import {
  createEventHandler,
  deleteEventHandler,
  getEventsHandler,
  toggleLikeEventHandler,
} from "./handlers/index.js"

const eventsRouter = Router()

eventsRouter.post("/", jsonBodyParser, authorizationHandler, createEventHandler)
eventsRouter.delete("/:eventId", authorizationHandler, deleteEventHandler)
eventsRouter.get("/:eventId/likes", authorizationHandler, getEventsHandler)
eventsRouter.patch(
  "/:postId/likes",
  authorizationHandler,
  toggleLikeEventHandler
)

export default eventsRouter
