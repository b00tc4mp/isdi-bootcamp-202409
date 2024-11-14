import db from 'dat'
import { validate } from './helpers/index.js'
import { errors } from 'com'
import { models } from 'dat'

const { SystemError, NotFoundError } = errors
const { User, Post } = models


// ----- POSTS STUFF ------
export default (userId, text, image) => {
    validate.id(userId, 'userId')
    validate.text(text)
    validate.image(image)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.create({ author: userId, text, image, likes: [], comments: [], date: new Date })
                .catch((error) => { throw new SystemError(error.message) })
        })
        .then((_) => { })
}