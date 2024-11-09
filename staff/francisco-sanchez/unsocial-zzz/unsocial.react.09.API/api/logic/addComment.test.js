import addComment from './addComment.js'

try {
    //userId, postId, text
    addComment('m2osxzzmwg6', 'm2x6bfznwyj', 'Me too!')
} catch (error) {
    console.error(error)
}