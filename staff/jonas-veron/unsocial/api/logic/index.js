import { registerUser, authenticateUser, getUserName } from "./users/index.js"

import {
  createPost,
  deletePost,
  getPosts,
  toggleLikePost,
  addComment,
  removeComment,
  getComments,
} from "./posts/index.js"

const logic = {
  authenticateUser,
  registerUser,
  getUserName,

  getPosts,
  createPost,
  deletePost,

  toggleLikePost,

  addComment,
  removeComment,
  getComments,
}

export default logic
