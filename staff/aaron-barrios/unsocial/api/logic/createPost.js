import db from 'dat'
import { validate } from './helpers/index.js'
import { errors } from 'com'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors


// ----- POSTS STUFF ------
export default (userId, text, image) => {
    validate.id(userId, 'userId')
    validate.text(text)
    validate.image(image)

    const userObjectId = new ObjectId(userId)

    return db.users.findOne({ _id: userObjectId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return db.posts
                .insertOne({ author: userObjectId, text, image, likes: [], comments: [], date: new Date })
                .catch((error) => { throw new SystemError(error.message) })
        })
        .then((_) => { })
}