import db from 'dat'

import { validate } from 'apu'

const { ObjectId } = db

export default (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)

    const objectUserId = ObjectId.createFromHexString(userId)

    return db.users.findOne({ _id: objectUserId })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            const post = {
                image,
                text,
                author: objectUserId,
                date: new Date,
                likedBy: [],
                comments: []
            }

            return db.posts.insertOne(post)
        })
        .then(_ => { })
}