import { storage } from '../data/index.js'
<<<<<<< HEAD
import { validate } from 'com'
=======
import { validate } from './helpers/index.js'
>>>>>>> 1b468274c84eb6f3853c660b2b2683f639a5aa7b

export default userId => {
    validate.id(userId, 'userId')

    const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('user not found')

    posts.forEach(post => {
        const { author: authorId } = post

        const { username } = users.find(({ id }) => id === authorId)

        post.author = { id: authorId, username }

        post.liked = post.likes.includes(userId)

        post.comments = post.comments.length
    })
<<<<<<< HEAD
=======

    /* const reversedPosts = posts.slice().reverse();
    return reversedPosts */
    /* console.log(Array.isArray(posts))
    console.log(posts) */
>>>>>>> 1b468274c84eb6f3853c660b2b2683f639a5aa7b

    return posts.toReversed()
}