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
  changePassword,
  changeEmail,
  changeProfilePicture,
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
  searchAddress,
}
export default logic
