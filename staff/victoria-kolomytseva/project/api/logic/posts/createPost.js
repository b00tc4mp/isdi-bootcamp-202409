import { User, Post } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, image, whatHappened, petType, petGender, text) => {
    validate.id(userId, 'userId')
    validate.text(petType)
    validate.image(image)
    validate.text(whatHappened)
    validate.text(petGender)



    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.create({ author: userId, image, whatHappened, petType, petGender, text })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}