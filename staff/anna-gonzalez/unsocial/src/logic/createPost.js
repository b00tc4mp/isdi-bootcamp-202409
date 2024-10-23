import uuid from '../data/uuid'

const createPost = (image, text) => {
    if (typeof image !== 'string') throw new Error('Invalid image')
    if (typeof text !== 'string') throw new Error('Invalid text')

    const posts = JSON.parse(localStorage.posts)

    const post = {
        id: uuid(),
        image: image,
        text: text,
        author: sessionStorage.userId,
        date: new Date,
        likes: []
    }

    posts.push(post)

    localStorage.posts = JSON.stringify(posts)
}

export default createPost