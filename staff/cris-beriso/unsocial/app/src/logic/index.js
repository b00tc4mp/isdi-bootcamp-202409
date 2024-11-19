import registerUser from './registerUser'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import getUserName from './getUserName'
import logoutUser from './logoutUser'
import getUserId from './getUserId'
import goProfileUser from './goProfileUser'
import getUserRole from './getUserRole'
import isUserRoleRegular from './isUserRoleRegular'
import isUserRoleModerator from './isUserRoleModerator'

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
  getUserRole,
  isUserRoleRegular,
  isUserRoleModerator,

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