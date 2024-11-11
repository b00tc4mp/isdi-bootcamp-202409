import { validate } from 'com'
import db from 'dat'

const { ObjectId } = db
export default (userId, postId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.posts.findOne({ _id: ObjectId.createFromHexString(postId) })
                .catch(error => { new Error(error.message) })
        }).then(post => {
            if (!post) throw new Error('post not found')

            const { comments } = post

            const comment = comments.find(comment => comment._id.equals(ObjectId.createFromHexString(commentId)))
            console.log(comment)
            if (!comment)
                throw new Error('comment not found')

            const { author } = comment

            if (author.toString() !== userId)
                throw new Error('user is not author of comment')

            /* return db.posts.findOne({ _id: ObjectId.createFromHexString(postId), comments: { $elemMatch: { _id: ObjectId.createFromHexString(commentId) } } })
                .catch(error => { new Error(error.message) })
        }).then(comment => {
            if (!comment) throw new Error('comment not found')

            /* console.log(comment) 

            const { author } = comment
            console.log(author.toString())
            if (author.toString() !== userId) throw new Error('user is not author of comment') */

            return db.posts.updateOne({ _id: ObjectId.createFromHexString(postId) }, { $pull: { comments: { _id: ObjectId.createFromHexString(commentId) } } })
        }).then(_ => { })

}



/* const { users, posts } = storage

const found = users.some(({ id }) => id === userId)

if (!found) throw new Error('user not found')

const post = posts.find(({ id }) => id === postId)

if (!post) throw new Error('post not found')

const { comments } = post

const index = comments.findIndex(({ id }) => id === commentId)

if (index < 0)
    throw new Error('comment not found')

const { author } = comments[index]

if (author !== userId)
    throw new Error('user is not author of comment')

comments.splice(index, 1)

storage.posts = posts
} */