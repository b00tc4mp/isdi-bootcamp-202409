import { validate } from './helpers/index.js'
import { storage, uuid } from '../data/index.js'

export default (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text)

    const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)
    const postFound = posts.some(({ id }) => id === postId)


    if (!found) {
        throw new Error('user nor found')
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




}