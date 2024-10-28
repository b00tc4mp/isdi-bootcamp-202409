import registerUser from './registerUser';
import loginUser from './loginUser';
import isUserLoggedIn from './isUserLoggedIn'
import getUserName from './getUserName';
import logoutUser from './logoutUser';
import getUserId from './getUserId'

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
    getUserName,
    logoutUser,
    getUserId,

    createPost,
    getPosts,
    toggleLikePost,
    deletePost,

    addComment,
    getComments,
    removeComments

}

export default logic
