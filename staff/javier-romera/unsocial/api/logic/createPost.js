import db from 'dat'

import { validate, errors } from 'apu'

const { SystemError, NotFoundError } = errors

const { ObjectId } = db

export default (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)

    const userObjectId = ObjectId.createFromHexString(userId)

    return db.users.findOne({ _id: userObjectId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return db.posts.insertOne({ author: userObjectId, image, text, date: new Date, likedBy: [], comments: [] })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}