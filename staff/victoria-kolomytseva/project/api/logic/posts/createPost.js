import { User, Post } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, image, whatHappened, petType, petGender, text, location) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.petType(petType)
    validate.whatHappened(whatHappened)
    validate.petGender(petGender)
    validate.text(text)
    validate.location(location)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.create({
                author: userId,
                image,
                whatHappened,
                petType,
                petGender,
                text,
                location: {
                    type: 'Point',
                    coordinates: location.coordinates,
                    address: location.address,
                    province: location.province,
                },
            })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}