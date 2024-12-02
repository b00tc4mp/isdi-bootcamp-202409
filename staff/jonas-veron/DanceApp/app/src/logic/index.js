import {
  registerUser,
  loginUser,
  logoutUser,
  isUserLoggedIn,
  getUserName,
  getUserId,
} from "./users"

import { createEvent, deleteEvent, getEvents } from "./events"

const logic = {
  registerUser,
  loginUser,
  logoutUser,
  isUserLoggedIn,
  getUserName,
  getUserId,

  createEvent,
  deleteEvent,
  getEvents,
}
export default logic
