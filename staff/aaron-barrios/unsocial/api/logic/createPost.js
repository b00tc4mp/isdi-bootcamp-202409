import validate from './helpers/validate.js'

import { storage, uuid } from '../data/index.js'

// ----- POSTS STUFF ------
export default (userId, text, image) => {
    validate.id(userId, 'userId')
    validate.text(text)
    validate.image(image)

    const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('user not found')

    const post = {
        id: uuid(),
        image: image,
        text: text,
        author: userId,
        date: new Date,
        likes: [],
        comments: []
    }

    posts.push(post)

    storage.posts = posts
}