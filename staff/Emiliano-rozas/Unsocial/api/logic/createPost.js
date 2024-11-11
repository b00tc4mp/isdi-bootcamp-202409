import db from 'dat'

import { validate } from 'com'

const { ObjectId } = db

export default (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)


    const ObjectUserId = ObjectId.createFromHexString(userId)

    return db.users
        .findOne({ _id: ObjectUserId })
        .catch((error) => {
            throw new Error(error.message)
        })
        .then((user) => {
            if (!user) throw new Error('user not found');

            return db.posts
                .insertOne({ author: ObjectUserId, image, text, date: new Date, likes: [], comments: [] })
                .catch((error) => {
                    throw new Error(error).message
                });
        })
        .then((_) => { })
}