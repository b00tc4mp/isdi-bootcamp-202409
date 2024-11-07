import { validate } from 'com'
import { storage } from '../data/index.js'

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('user not found')

<<<<<<< HEAD
=======
    const { users, posts } = storage
    const user = users.find(({ id }) => id === userId)

    if (!user) throw new Error('user not found')

>>>>>>> 1b468274c84eb6f3853c660b2b2683f639a5aa7b
    const index = posts.findIndex(({ id }) => id === postId)

    if (index < 0) throw new Error('post not found')

    const post = posts[index]

    const { author } = post

    if (author !== userId) throw new Error('user is not author of post')

    posts.splice(index, 1)

    storage.posts = posts
}