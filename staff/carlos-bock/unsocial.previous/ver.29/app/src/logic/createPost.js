//import {validate} from './helpers'
import validate from './helpers/validate'

import uuid from '../data/uuid'

const createPost = (image, text) => {
    validate.image(image)
    validate.text(text)

    const posts = JSON.parse(localStorage.posts);

    const post = {
        id: uuid(),
        image: image,
        text: text,
        author: sessionStorage.userID,
        date: new Date,
        likes: []
    }
   
    posts.push(post);

    localStorage.posts = JSON.stringify(posts)
}

export default createPost