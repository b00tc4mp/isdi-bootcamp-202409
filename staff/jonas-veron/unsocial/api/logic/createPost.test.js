import createPost from './createPost.js'

try {
    createPost(userId, image, text)
} catch (error) {
    console.error(error)
}