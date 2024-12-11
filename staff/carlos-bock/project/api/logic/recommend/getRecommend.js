import { User, Recommend } from '../../../dat/index.js'
import validate from '../../../com/validate.js'; import errors from '../../../com/errors.js';

const { SystemError, NotFoundError } = errors

const getRecommend = (userId) => {
    validate.id(userId, 'userId')

    return Promise.all([
        User.findById(userId).lean(),
        Recommend.find().populate('author', 'username').sort({ date: -1 }).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, recommends]) => {
            if (!user) throw new NotFoundError('user not found')

            recommends.forEach(recommend => {
                recommend.id = recommend._id.toString()
                delete recommend._id

                if (recommend.author._id) {
                    recommend.author.id = recommend.author._id.toString()
                    delete recommend.author._id
                }

            })

            return recommends
        })
}

export default getRecommend