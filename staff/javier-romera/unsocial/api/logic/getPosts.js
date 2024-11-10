import db from 'dat'

import { validate } from 'apu'

const { ObjectId } = db

export default userId => {
    validate.id(userId, 'userId')

    const objectUserId = ObjectId.createFromHexString(userId)

    return db.users.findOne({ _id: objectUserId })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.posts.find().toArray()
                .catch(error => { new Error(error.message) })
        })
        .then(allPosts => {
            return db.users.find().toArray()
                .catch(error => { new Error(error.message) })
                .then(allUsers => {
                    const transformedPosts = []

                    allPosts.forEach(post => {
                        const { author: authorId, likedBy, comments } = post

                        const { username } = allUsers.find(({ _id }) => _id.equals(authorId))

                        transformedPosts.push({
                            ...post,
                            author: {
                                _id: authorId,
                                username
                            },
                            liked: likedBy.some(id => id.equals(objectUserId)),
                            comments: comments.length
                        })
                    })
                    return transformedPosts.toReversed()
                })
        })
}