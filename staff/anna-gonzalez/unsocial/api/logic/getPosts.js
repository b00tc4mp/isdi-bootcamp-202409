import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default userId => {
    validate.id(userId, 'userId')

    const userIdObject = ObjectId.createFromHexString(userId)

    return db.users.findOne({ _id: new ObjectId(userIdObject) })
        .then(user => {
            if (!user) throw new Error('User not found')

            return db.posts.find().toArray()
                .then(allPosts => {
                    return db.users.find().toArray()
                        .then(allUsers => {
                            const transformedPosts = []

                            allPosts.forEach(post => {
                                const { _id, image, text, author: authorId, date } = post

                                const { username } = allUsers.find(({ _id }) => _id.toString() === authorId.toString())

                                transformedPosts.push({
                                    _id,
                                    image,
                                    text,
                                    author: {
                                        _id: authorId,
                                        username
                                    },
                                    date,
                                    likes: post.likes.includes(userId),
                                    saves: post.saves.includes(userId),
                                    comments: post.comments.length
                                })
                            })

                            return transformedPosts.toReversed()
                        })
                })
        })
}