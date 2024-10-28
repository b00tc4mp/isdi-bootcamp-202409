import uuid from '../data/uuid'
import getPosts from './getPosts'

const createPost = ({text,image}) => {
   
    if (typeof image !== 'string') throw new Error('invalid image')
    if (typeof text !== 'string') throw new Error('invalid text')

    const posts = getPosts()

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