import {
  registerUser,
  authenticateUser,
  getUserName,
  changePassword,
  changeEmail,
  changeProfilePicture,
} from "./users/index.js"

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
} from "./events/index.js"

const logic = {
  registerUser,
  authenticateUser,
  getUserName,
  changePassword,
  changeEmail,
  changeProfilePicture,

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
