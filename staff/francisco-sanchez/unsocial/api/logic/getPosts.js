import { storage } from '../data/index.js'
import validate from './helpers/validate.js'

export default userId => {
    validate.id(userId, 'userId')

    const { users, posts } = storage

    const user = users.find(({ id }) => id === userId)

    if (!user) throw new Error('user not found')


    posts.forEach(post => {

        //aquí va la lógica de del getPosts original 

        const { author: authorId } = post
        const { username } = users.find(({ id }) => id === authorId)

        post.author = { id: authorId, username }
        post.liked = post.likes.includes(userId)
        post.comments = post.comments.length

    })

    return posts.toReversed()




}