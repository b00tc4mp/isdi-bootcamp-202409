//import {validate} from './helpers'
import validate from './helpers/validate'

import uuid from '../data/uuid'

const addComments = (postId, text) => {
    validate.id(postId, 'postId')
    validate.text(text)

    const posts = JSON.parse(localStorage.posts)

    const post = posts.find(({id}) => id === postId)

    if(!post) throw new Error('post not found')

    post.comments.push({
        id: uuid(),
        author: sessionStorage.userId,
        text,
        date: new Date
    })

    localStorage.posts = JSON.stringify(posts)
}

export default addComments