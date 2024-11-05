import uuid from '../data/uuid'

const createPostLogic = (image, text) => {
    if (typeof image !== 'string') throw new Error('invalid image')
    if (typeof text !== 'string') throw new Error('invalid text')

    const posts = JSON.parse(localStorage.posts)

    const post = {
        id: uuid(),
        image: image,
        text: text,
        author: sessionStorage.userId,
        date: new Date().toDateString(),
        likes: []
    }

    posts.push(post)

    localStorage.posts = JSON.stringify(posts)
}
export default createPostLogic
