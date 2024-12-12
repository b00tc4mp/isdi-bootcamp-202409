import {
  registerUser,
  loginUser,
  logoutUser,
  isUserLoggedIn,
  getUserName,
  getUserId,
  getUserLocation,
  isUserRoleOrganizer,
  isUserPermissionWrite,
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
  searchAddress,
} from "./events"

const logic = {
  registerUser,
  loginUser,
  logoutUser,
  isUserLoggedIn,
  getUserName,
  getUserId,
  getUserLocation,
  isUserRoleOrganizer,
  isUserPermissionWrite,

  createEvent,
  deleteEvent,
  getEvents,
  toggleLikeEvent,
  addComment,
  removeComment,
  getComments,
  toggleFavoriteEvent,
  getFavoriteEvents,
  searchAddress,
}
export default logic
