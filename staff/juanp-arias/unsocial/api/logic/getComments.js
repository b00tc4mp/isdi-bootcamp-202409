import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(userId, 'user Id')
    validate.id(postId, 'post Id')

    const objectUserId = new ObjectId(userId)
    const objectPostId = new ObjectId(postId)

    return Promise.all([
        db.users.findOne({ _id: objectUserId }),
        db.posts.findOne({ _id: objectPostId }),
    ])
        .catch(error => { throw new Error(error.mesage) })
        .then(([user, post]) => {
            if (!user) throw new Error('user not found')
            if (!post) throw new Error('post not found')
        })
        .then(comments => {
            const { comments } = post

            const { username } = user
            post.id = {}
        })
    //TODO

}