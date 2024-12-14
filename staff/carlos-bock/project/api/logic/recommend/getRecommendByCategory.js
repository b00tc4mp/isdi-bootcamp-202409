import { Recommend } from '../../../dat/index.js'
import validate from '../../../com/validate.js'
import errors from '../../../com/errors.js'

const { SystemError, NotFoundError } = errors

const getRecommendByCategory = (userId, category) => {
    validate.id(userId, 'userId');
    validate.number(category, 'category')

    return Promise.all([
        Recommend.find({ category: category })
            .populate('author', 'username')
            .lean(),
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([recommends]) => {// removed user from array
            if (!recommends) throw new NotFoundError('recommendations not found')

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

export default getRecommendByCategory
