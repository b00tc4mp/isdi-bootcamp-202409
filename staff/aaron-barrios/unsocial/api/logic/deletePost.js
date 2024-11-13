import { validate } from './helpers/index.js'

import db from 'dat'

const { ObjectId } = db

import { errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors


export default (userId, postId) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')

    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const postObjectId = new ObjectId(postId)

            return db.posts
                .findOne({ _id: postObjectId })
                .then((post) => {
                    if (!post) throw new NotFoundError('post not found')
                    if (!post.author.equals(userId)) throw new OwnershipError('user is not author of post')

                    return db.posts.deleteOne({ _id: postObjectId })
                        .catch(error => { throw new SystemError(error.message) })
                })
                .then((_) => { })
        })
}