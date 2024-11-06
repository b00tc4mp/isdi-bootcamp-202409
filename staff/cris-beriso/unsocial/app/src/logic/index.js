import registerUser from './registerUser'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import getUserName from './getUserName'
import logoutUser from './logoutUser'
import getUserId from './getUserId'
import goProfileUser from './goProfileUser'

import createPost from './createPost'
import getPosts from './getPosts'
import toggleLikePost from './toggleLikePost'
import deletePost from './deletePost'
// import savePost from './savePost'

import addComment from './addComment'
import getComments from './getComments'
import removeComment from './removeComment'

const logic = {
  registerUser,
  loginUser,
  isUserLoggedIn,
  getUserName,
  logoutUser,
  getUserId,
  goProfileUser,

  createPost,
  getPosts,
  toggleLikePost,
  deletePost,
  //savePost,

  addComment,
  getComments,
  removeComment
}

export default logic