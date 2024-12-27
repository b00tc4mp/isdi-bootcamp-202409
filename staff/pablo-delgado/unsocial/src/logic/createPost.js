import { validate } from './helpers'

import uuid from '../data/uuid'

export default (image, text) => {
    validate.image(image)
    validate.text(text)

    const posts = JSON.parse(localStorage.posts)

    const post = {
        id: uuid(),
        image: image,
        text: text,
        author: sessionStorage.userId,
        date: new Date,
        likes: [],
        comments: []
    }
    posts.push(post)

    localStorage.posts = JSON.stringify(posts)
}
