import { validate } from './helpers/index.js'
import { storage } from '../data/index.js'

export default (userId, postId) => {

    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('user not found')

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('post not found')

    const { likes } = post

    const index = likes.indexOf(userId)

    if (index < 0)
        likes.push(userId)
    else
        likes.splice(index, 1)

    storage.posts = posts

    /*
    - Validamos
    - sacamos usuarios y posts de storage
    
    si no hay error recogemos el id del post
    
    Luego montamos la lógica para añadir los likes
    
    
    */

}