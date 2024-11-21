import createPost from './createPost.js'

import { users, posts } from '../data/index.js'

const { id: userId } = users[0]

try {
    createPost(userId, 'https://image.com', 'hola mundo')

    console.log(posts)

     // [{ id: ..., author: ..., image: 'https://image.com', text: 'hola mundo', date: ... }]
} catch (error) {
    console.error(error)
}
