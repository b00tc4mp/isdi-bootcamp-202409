import { validate } from 'com'

import { storage, uuid } from '../data/index.js'

export default (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)

    const { users, posts } = storage

    //some returns true or false
    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('User not found')

    const post = {
        id: uuid(),
        image: image,
        text: text,
        author: userId,
        date: new Date,
        likes: [],
        comments: [],
        saves: []
    }

    posts.push(post)

    storage.posts = posts
}