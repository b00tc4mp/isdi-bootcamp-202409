import createPost from './createPost.js'

import { users, posts } from '../data/index.js'

const { id: userId } = users[0]

try {
    createPost(userId, 'http://image.com', 'hola mundo')

    console.log(posts)
} catch (error) {
    console.error(error)
}