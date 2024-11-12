import db from 'dat'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

const { ObjectId } = db

export default (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)


    const ObjectUserId = ObjectId.createFromHexString(userId)

    return db.users
        .findOne({ _id: ObjectUserId })
        .catch((error) => {
            throw new SystemError(error.message)
        })
        .then((user) => {
            if (!user) throw new NotFoundError('user not found');

            return db.posts
                .insertOne({ author: ObjectUserId, image, text, date: new Date, likes: [], comments: [] })
                .catch((error) => {
                    throw new SystemError(error.message)
                });
        })
        .then((_) => { })
}