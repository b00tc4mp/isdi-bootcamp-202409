import { User, Post } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, image, whatHappened, petType, petGender, text, latitude, longitude) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(petType)
    console.log('what happened ==> ', whatHappened)
    validate.text(whatHappened)
    validate.text(petGender)



    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.create({ author: userId, image, whatHappened, petType, petGender, text, latitude, longitude })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}