import { uuid, users, posts } from '../data/index.js'
import { validate } from './helpers/index.js'

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
        likedBy: [],
        comments: []
    }
    posts.push(post)
}