import db from 'dat'

import { validate } from 'apu'

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const objectUserId = ObjectId.createFromHexString(userId)
    const objectPostId = ObjectId.createFromHexString(postId)

    return db.users.findOne({ _id: objectUserId })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.posts.findOne({ _id: objectPostId })
                .catch(error => { new Error(error.message) })
        })
        .then(post => {
            if (!post) throw new Error('post not found')

            return db.users.find({}).toArray()
                .catch(error => { new Error(error.message) })

                .then(allUsers => {
                    const transformedComments = []

                    const { comments } = post

                    comments.forEach(comment => {
                        const { _id, author: authorId, text, date } = comment

                        const { username } = allUsers.find(({ _id }) => _id.equals(authorId))

                        transformedComments.push({
                            _id,
                            author: {
                                _id: authorId,
                                username
                            },
                            text,
                            date
                        })
                    })
                    return transformedComments
                })
        })
}