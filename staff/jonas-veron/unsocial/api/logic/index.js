import authenticateUser from "./authenticateUser.js";
import registerUser from "./registerUser.js";
import getUserName from "./getUserName.js";

import getPosts from "./getPosts.js";
import createPost from "./createPost.js";
import deletePost from "./deletePost.js";

import toggleLikePost from "./toggleLikePost.js";

import addComment from "./addComment.js";
import removeComment from "./removeComment.js";
import getComments from "./getComments.js";

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
};

export default logic;