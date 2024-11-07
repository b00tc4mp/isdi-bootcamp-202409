import { validate } from 'com'
import { storage } from '../data/index.js'



export default (userId, postId) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')

    const { users, posts } = storage
    // const posts = storage.posts

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('user not found')
    
    const index = posts.findIndex(({ id }) => id === postId )

    if (index < 0) throw new Error('post not found')

    const post = posts[index]

    const { author } = post
    if (author !== userId) throw new Error('User is not author of post')

    posts.splice(index, 1)

    storage.posts = posts

}  