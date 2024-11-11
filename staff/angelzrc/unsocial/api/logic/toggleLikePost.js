import { validate } from 'com'
import db from 'dat'

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const userObjectId = new ObjectId(userId)
    const postObjectId = new ObjectId(postId)

    return db.users.findOne({ _id: userObjectId })
        .catch(error => { new Error(error.message) })
        .then(user => {

            if (!user) throw new Error('user not found')

            return db.posts.findOne({ _id: postObjectId })
                .catch(error => { new Error(error.message) })
        })
        .then(post => {
            if (!post) throw new Error('post not found')

            const { likes } = post

            const found = likes.some(id => id.equals(userObjectId))

            if (!found)
                return db.posts.updateOne({ _id: postObjectId }, { $push: { likes: userObjectId } })
                    .then(_ => { console.log('liked') })
            else
                return db.posts.updateOne({ _id: postObjectId }, { $pull: { likes: userObjectId } })
                    .then(_ => { console.log('unliked') })
        })
}
/* const { users, posts } = storage

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

storage.posts = posts */
