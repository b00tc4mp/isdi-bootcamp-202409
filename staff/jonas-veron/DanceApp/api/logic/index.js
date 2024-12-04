import { registerUser, authenticateUser, getUserName } from "./users/index.js"

import {
  createEvent,
  deleteEvent,
  getEvents,
  toggleLikeEvent,
  addComment,
} from "./events/index.js"
const logic = {
  registerUser,
  authenticateUser,
  getUserName,

  createEvent,
  deleteEvent,
  getEvents,
  toggleLikeEvent,
  addComment,
}

export default logic
