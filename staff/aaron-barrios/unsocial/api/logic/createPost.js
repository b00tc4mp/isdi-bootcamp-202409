import { validate, errors } from 'com'
import { User, Post } from 'dat'

const { SystemError, NotFoundError } = errors

// ----- POSTS STUFF ------
export default (userId, text, image) => {
    validate.id(userId, 'userId')
    validate.text(text)
    validate.image(image)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.create({ author: userId, text, image })
                .catch((error) => { throw new SystemError(error.message) })
        })
        .then((_) => { })
}