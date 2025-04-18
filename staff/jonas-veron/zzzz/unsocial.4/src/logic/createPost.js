import uuid from '../data/uuid'

export default (image, text) => {
    if (typeof image !== 'string') throw new Error('invalid text')
    if (typeof text !== 'string') throw new Error('invalid text')

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