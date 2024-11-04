import createPost from './createPost.js'
import deletePost from './deletePost.js'
import getPosts from './getPosts.js'
import likesInteraction from './likesInteraction.js'

import getUserName from './getUserName.js'
import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'

import addComment from './addComment.js'
import getComments from './getComments.js'
import removeComment from './removeComment.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,

    getComments,
    addComment,
    removeComment,

    createPost,
    getPosts,
    deletePost,
    likesInteraction
}

export default logic