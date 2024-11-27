import registerUser from './registerUser';
import loginUser from './loginUser';
import isUserLoggedIn from './isUserLoggedIn'
import isUserRoleRegular from './isUserRoleRegular';
import isUserRoleModerator from './isUserRoleModerator';
import getUserName from './getUserName';
import logoutUser from './logoutUser';
import getUserId from './getUserId'
import getUserRole from './getUserRole';

import createPost from './createPost';
import getPosts from './getPosts';
import deletePost from './deletePost';
import toggleLikePost from './toggleLikePost';

import addComment from './addComment'
import getComments from './getComments'
import removeComments from './removeComments';

const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    isUserRoleRegular,
    isUserRoleModerator,
    getUserName,
    logoutUser,
    getUserId,
    getUserRole,

    createPost,
    getPosts,
    toggleLikePost,
    deletePost,

    addComment,
    getComments,
    removeComments

}

export default logic
