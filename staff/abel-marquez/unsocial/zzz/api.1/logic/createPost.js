import { validate } from './helpers/index.js'

import { users, posts, uuid } from '../data/index.js'

export default (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)

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
}