import uuid from '../data/uuid'

import getElapsedTime from '../utils/getElapsedTime'

export default(userId, postId, text) => {
 
    // if (typeof text !== 'string') throw new Error('invalid text')
    // if (typeof userId !== 'string') throw new Error('invalid text')

    let posts = JSON.parse(localStorage.posts)

    let index = posts.findIndex(post => {
        post.id === postId
    })

    const comment = {
        id: uuid(),
        author: userId,
        text: text,
        date: new Date
    }

    posts[index].comments.push(comment)

    localStorage.posts = JSON.stringify(posts)
}