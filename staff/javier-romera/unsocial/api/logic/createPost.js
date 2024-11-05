import { validate } from 'apu'

import { storage, uuid } from '../data/index.js'

export default (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)

    const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('user not found')

    const post = {
        id: uuid(),
        image: image,
        text: text,
        author: userId,
        date: new Date,
        likedBy: [],
        comments: []
    }

    posts.push(post)

    storage.posts = posts
}