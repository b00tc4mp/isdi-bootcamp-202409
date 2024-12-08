import { Router, json } from "express"

import { authorizationHandler, jsonBodyParser } from "../helpers/index.js"

import {
  createEventHandler,
  deleteEventHandler,
  getEventsHandler,
  toggleLikeEventHandler,
  addCommentHandler,
  removeCommentHandler,
  getCommentsHandler,
  toggleFavoriteEventHandler,
  getFavoriteEventsHandler,
} from "./handlers/index.js"

const eventsRouter = Router()

eventsRouter.post("/", jsonBodyParser, authorizationHandler, createEventHandler)
eventsRouter.delete("/:eventId", authorizationHandler, deleteEventHandler)
eventsRouter.get("/", authorizationHandler, getEventsHandler)
eventsRouter.patch(
  "/:eventId/likes",
  authorizationHandler,
  toggleLikeEventHandler
)
eventsRouter.post(
  "/:eventId/comments",
  authorizationHandler,
  jsonBodyParser,
  addCommentHandler
)
eventsRouter.delete(
  "/:eventId/comments/:commentId",
  authorizationHandler,
  removeCommentHandler
)
eventsRouter.get("/:eventId/comments", authorizationHandler, getCommentsHandler)

eventsRouter.patch(
  "/:eventId/favorites",
  authorizationHandler,
  toggleFavoriteEventHandler
)
eventsRouter.get("/favorites", authorizationHandler, getFavoriteEventsHandler)

export default eventsRouter
