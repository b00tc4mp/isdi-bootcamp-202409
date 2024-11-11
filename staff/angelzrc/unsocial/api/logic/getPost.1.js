import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db


export default userId => {
    validate.id(userId, 'userId')

    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            /*  const posts = db.posts
             const users = db.users */
            return db.posts.find().toArray()
                .catch(error => { new Error(error.message) })
                .then(posts => {
                    return db.users.find().toArray()
                        .catch(error => { new Error(error.message) })
                        .then(users => {
                            console.log(posts)
                            console.log(users)
                            /* console.log(users) */
                            posts.forEach(post => {
                                const { author: authorId } = post
                                const { username } = users.find(({ _id }) => _id === authorId)

                                post.author = { _id: authorId, username }

                                post.liked = post.likes.includes(objectIdUser)

                                post.comments = post.comments.length
                            })

                            return posts.toReversed()

                        })
                }
                )


        })


}
