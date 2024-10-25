import uuid from '../data/uuid'

const createPost = (userId ,image, text) => {
    if (typeof userId !== 'string') throw new Error('invalid userId')
    //// Validate image input (assuming it's a URL or string, or can be any truthy value)
    if (typeof image !== 'string')
        throw new Error('Invalid image');

    if (typeof text !== 'string')
        throw new Error('Invalid text')
    
    const posts = localStorage.posts ? JSON.parse(localStorage.posts) : []

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