import { User, Recommend, Country, City } from '../../../../dat/index.js'

import validate from '../../../../com/validate.js'// import { validate, errors } from 'com'
import errors from '../../../../com/errors.js'

const { SystemError, NotFoundError } = errors

const createRecommend = (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text) // add a validate recommend logic?

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError

            return Recommend.create({ author: userId, image, text }).
                catch(error => { throw new SystemError(error.message) })
        })
        .then(_, => { })     // place holder logic 
}

export default createRecommend

