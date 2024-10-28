import uuid from '../data/uuid'

const createPost = (userId, image, text) => {
    if (typeof userId !== 'string') throw new Error('Invalid userId')
    if (typeof image !== 'string') throw new Error('Invalid image')
    if (typeof text !== 'string') throw new Error('Invalid text')

    const posts = JSON.parse(localStorage.posts)

    const post = {
        id: uuid(),
        image: image,
        text: text,
        author: userId,
        date: new Date,
        likes: []
    }

    posts.push(post)

    localStorage.posts = JSON.stringify(posts)
}

export default createPost