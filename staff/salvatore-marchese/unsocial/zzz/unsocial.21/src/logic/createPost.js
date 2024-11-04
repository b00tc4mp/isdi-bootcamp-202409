import uuid from '../data/uudi'

const createPost = (image, text) => {
    //// Validate image input (assuming it's a URL or string, or can be any truthy value)
    if (typeof image !== 'string')
        throw new Error('Invalid image');

    if (typeof text !== 'string')
        throw new Error('Invalid text')

    const posts = JSON.parse(localStorage.posts)

    const post = {
        id: uuid(),
        image: image,
        text: text,
        author: sessionStorage.userId,
        date: new Date
    }

    posts.push(post)

    localStorage.posts = JSON.stringify(posts)
}

export default createPost