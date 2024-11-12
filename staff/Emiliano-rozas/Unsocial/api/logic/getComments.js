
import db from 'dat'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return Promise.all([
        db.users.findOne({ _id: ObjectId.createFromHexString(userId) }),
        db.posts.findOne({ _id: ObjectId.createFromHexString(postId) })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const { comments } = post

            const authorObjectIds = []

            comments.forEach(comment => {

                const { author } = comment

                const found = authorObjectIds.some(authorObjectId => authorObjectId.equals(author))

                if (!found) authorObjectIds.push(author)


            })
            return db.users.find({ _id: { $in: authorObjectIds } }, { projection: { username: 1 } }).toArray()
                .catch(error => { throw new SystemError(error.message) })
                .then(authors => {
                    comments.forEach(comment => {
                        comment.id = comment._id.toString()
                        delete comment._id

                        const author = authors.find(({ _id }) => _id.equals(comment.author))

                        const { _id, username } = author

                        comment.author = {
                            id: _id.toString(),
                            username

                        }
                    })

                    return comments
                })
        })

}


