import {
  registerUser,
  loginUser,
  logoutUser,
  isUserLoggedIn,
  getUserName,
  getUserId,
} from "./users"

import {
  createEvent,
  deleteEvent,
  getEvents,
  toggleLikeEvent,
  addComment,
  removeComment,
  getComments,
  toggleFavoriteEvent,
  getFavoriteEvents,
} from "./events"

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
  addComment,
  removeComment,
  getComments,
  toggleFavoriteEvent,
  getFavoriteEvents,
}
export default logic
