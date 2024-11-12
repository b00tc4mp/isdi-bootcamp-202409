import db from 'dat'
import { validate, errors } from 'com'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors

export default (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)

    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return db.posts.insertOne({
                author: ObjectId.createFromHexString(userId),
                image: image,
                text: text,
                date: new Date,
                likes: [],
                comments: []
            })
                .then(_ => { })
                .catch(error => {
                    throw new SystemError(error.message)
                })
        })
}
