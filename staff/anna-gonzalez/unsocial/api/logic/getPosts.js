import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default userId => {
    validate.id(userId, 'userId')

    const userIdObject = ObjectId.createFromHexString(userId)

    return db.users.findOne({ _id: userIdObject })
        .then(user => {
            if (!user) throw new Error('User not found')

            return db.posts.find().toArray()
        })
        .then(allPosts => {
            return db.users.find().toArray()
                .then(allUsers => {
                    const transformedPosts = []

                    allPosts.forEach(post => {
                        const { author: authorId, likes, saves, comments } = post

                        const { username } = allUsers.find(({ _id }) => _id.equals(authorId))

                        transformedPosts.push({
                            ...post,
                            author: {
                                _id: authorId,
                                username
                            },
                            liked: likes.some(_id => _id.equals(userIdObject)),
                            saved: saves.some(_id => _id.equals(userIdObject)),
                            comments: comments.length
                        })
                    })

                    return transformedPosts.toReversed()
                })
        })
}