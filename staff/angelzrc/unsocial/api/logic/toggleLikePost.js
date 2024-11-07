<<<<<<< HEAD
import { validate } from 'com'
import { storage } from '../data/index.js'
=======
import { storage } from "../data/index.js"
>>>>>>> 1b468274c84eb6f3853c660b2b2683f639a5aa7b

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const { users, posts } = storage
<<<<<<< HEAD

    const found = users.some(({ id }) => id === userId)
=======
    const found = users.som(({ id }) => id === userId)
>>>>>>> 1b468274c84eb6f3853c660b2b2683f639a5aa7b

    if (!found) throw new Error('user not found')

    const post = posts.find(({ id }) => id === postId)

<<<<<<< HEAD
    if (!post) throw new Error('post not found')
=======
    if (!post) throw new Error('user not found')
>>>>>>> 1b468274c84eb6f3853c660b2b2683f639a5aa7b

    const { likes } = post

    const index = likes.indexOf(userId)

    if (index < 0)
        likes.push(userId)
    else
        likes.splice(index, 1)

    storage.posts = posts
<<<<<<< HEAD
=======

>>>>>>> 1b468274c84eb6f3853c660b2b2683f639a5aa7b
}