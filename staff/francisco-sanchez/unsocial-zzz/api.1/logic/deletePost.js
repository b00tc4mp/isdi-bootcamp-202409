import db from 'dat'
import { validate, errors } from 'com'
//import { storage } from '../data/index.js'

const { ObjectId } = db

const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    //const { users, posts } = storage

    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            //console.log('User found:', user);
            return db.posts.findOne({ _id: ObjectId.createFromHexString(postId) }) //Esto me devuelve el post a borrar si lo encuentra
        })
        .then(post => {
            if (!post) throw new NotFoundError('post not found')
            //console.log('Post found:', post);


            if (post.author.toString() !== userId) throw new OwnershipError('User is not the author of the post')
            //El if anterior también lo podríamos haber escrito con la función equals: 
            //if (post.author.equals(userId)) throw new Error('User is not the author of the post')
            return db.posts.deleteOne({ _id: ObjectId.createFromHexString(postId) })
        })
        .then(result => {
            console.log('Delete Result:', result);

            if (!result || result.deletedCount === 0) throw new SystemError('Error deleting post')

            return { message: 'Post deleted successfully' }

        })

        .catch(error => {
            console.error = new SystemError('Error deleting post:', error.message)
            throw error
        })






    // const found = users.some(({ id }) => id === userId)

    // if (!found) throw new Error('user not found')

    // const index = posts.findIndex(({ id }) => id === postId)

    // if (index < 0) throw new Error('post not found')

    // const post = posts[index]

    // const { author } = post

    // if (author !== userId) throw new Error('user is not author of post')

    // posts.splice(index, 1)

    // storage.posts = posts
}