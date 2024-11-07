import removeComment from './removeComment.js'

try {
    removeComment(userId, postId, commentId)
} catch (error) {
    console.error(error)
}