import {
  registerUser,
  loginUser,
  logoutUser,
  isUserLoggedIn,
  getUserName,
  getUserId,
} from "./users"

import { createEvent, deleteEvent, getEvents, toggleLikeEvent } from "./events"

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
  toggleLikeEvent,
}
export default logic
