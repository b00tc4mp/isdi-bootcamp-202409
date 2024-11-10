import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const userIdObject = ObjectId.createFromHexString(userId)
    const postIdObject = ObjectId.createFromHexString(postId)

    return db.users.findOne({ _id: userIdObject })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('User not found')

            return db.posts.findOne({ _id: postIdObject })
        })
        .then(post => {
            if (!post) throw new Error('Post not found')

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