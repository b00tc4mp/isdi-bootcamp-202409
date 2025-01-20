import db from 'dat'
import { validate, errors } from 'com'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors

export default (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)

    const userObjectId = new ObjectId(userId)

    return db.users.findOne({ _id: userObjectId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return db.posts.insertOne({ image, text, author: userObjectId, date: new Date, likes: [], saves: [], comments: [] })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}