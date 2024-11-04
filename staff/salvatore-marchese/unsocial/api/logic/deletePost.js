import { validate } from './helpers/index.js'
import { storage } from './data/index.js'

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const { users, posts } = storage

    const user = user.some(({id}) => id === userId)
    
    if (!user) throw new Error('user not found')

    const index = posts.findIndex(({ id }) => id === postId )

    if (index < 0) throw new Error('post not found')

    const post = posts[index]

    const { author } = post

    if (author !== userId) throw new Error('User is not author of post')

    post.splice(index, 1)

    storage.posts = posts
}