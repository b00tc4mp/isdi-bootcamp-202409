import uuid from '../data/uuid'

import { validate } from './helpers'
// ----- POSTS STUFF ------
export default (text, image) => {
    validate.text(text)
    validate.image(image)

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