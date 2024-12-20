import { Router, json } from "express"

import { authorizationHandler, jsonBodyParser } from "../helpers/index.js"

import {
  authenticateUserHandler,
  registerUserHandler,
  getUserNameHandler,
  changePasswordHandler,
  changeEmailHandler,
  changeProfilePictureHandler,
} from "./handlers/index.js"

const usersRouter = Router()

usersRouter.post("/auth", jsonBodyParser, authenticateUserHandler)
usersRouter.post("/", jsonBodyParser, registerUserHandler)
usersRouter.get("/:targetUserId/name", authorizationHandler, getUserNameHandler)
usersRouter.post(
  "/changePassword",
  jsonBodyParser,
  authorizationHandler,
  changePasswordHandler
)
usersRouter.post(
  "/changeEmail",
  jsonBodyParser,
  authorizationHandler,
  changeEmailHandler
)
usersRouter.post(
  "/profilePicture",
  jsonBodyParser,
  authorizationHandler,
  changeProfilePictureHandler
)

export default usersRouter
