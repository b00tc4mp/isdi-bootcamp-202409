import { validate } from 'com'
import { storage, uuid } from '../data/index.js'

export default (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text)

    const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('user not found')

<<<<<<< HEAD
    const post = posts.find(({ id }) => id === postId)
=======
    if (!found) {
        throw new Error('user not found')
    } else if (!postFound) {
        throw new Error('post not found')
    } else {
        const post = posts.find(({ id }) => id === postId)

        const comment = {
            id: uuid(),
            author: userId,
            text,
            date: new Date
        }
        post.comments.push(comment)

        storage.posts = posts
    }
>>>>>>> 1b468274c84eb6f3853c660b2b2683f639a5aa7b

    if (!post) throw new Error('post not found')

    const { comments } = post

    comments.push({
        id: uuid(),
        author: userId,
        text,
        date: new Date().toISOString()
    })

    storage.posts = posts
}