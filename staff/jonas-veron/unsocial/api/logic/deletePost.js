import { validate } from './helpers/index.js'
import { storage } from '../data/index.js'



export default (userId, postId) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')

    const { posts } = storage
    // const posts = storage.posts
    
    const index = posts.findIndex(({ id }) => id === postId )

    if (index < 0) throw new Error('post not found')

    const post = posts[index]

    const { author } = post
    if (author !== userId) throw new Error('User is not author of post')

    posts.splice(index, 1)

    storage.posts = posts

}  