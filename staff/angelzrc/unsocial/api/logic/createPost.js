import db from 'dat'
import { models } from 'dat'

import { validate, errors } from 'com'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors
const { User, Post } = models


export default (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)

    const userObjectId = new ObjectId(userId)

    return User.findOne({ _id: userObjectId })
        .catch((error) => {
            throw new Error(error.message)
        })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            return Post.create({ author: userObjectId, image, text, date: new Date(), likes: [], comments: [] })
                .catch(error => { throw new SystemError(error.message) })
        }).then(_ => { })


}