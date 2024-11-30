import { registerUser, authenticateUser, getUserName } from "./users/index.js"

import { createEvent, deleteEvent, getEvents } from "./events/index.js"
const logic = {
  registerUser,
  authenticateUser,
  getUserName,

  createEvent,
  deleteEvent,
  getEvents,
}

export default logic
