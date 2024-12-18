import { Recommend } from '../../../dat/index.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

const getRecommendById = (userId, recommendId) => {
    validate.id(userId, 'userId')
    validate.id(recommendId, 'recommendId')

    return Promise.all([
        Recommend.findOne({ _id: recommendId })
            .populate('author', 'username')
            .lean(),
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([recommend]) => {
            if (!recommend) throw new NotFoundError('Recommendation not found')

            recommend.id = recommend._id.toString()
            delete recommend._id;

            if (recommend.author._id) {
                recommend.author.id = recommend.author._id.toString()
                delete recommend.author._id
            }

            return recommend
        });
};

export default getRecommendById
