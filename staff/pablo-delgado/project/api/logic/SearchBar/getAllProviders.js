import { User, Provider } from '../data/models.js'

import { validate, errors } from '../../../com/index.js'
const { NotFoundError, SystemError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Provider.find({}, { __v: 0 }).sort({ name: 1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(Providers => {
                    return Providers.map(Provider => {
                        Provider.id = Provider._id.toString()
                        Provider.location.id = Provider.location._id.toString()
                        delete Provider._id
                        delete Provider.location._id

                        return Provider
                    })
                })
        })
}