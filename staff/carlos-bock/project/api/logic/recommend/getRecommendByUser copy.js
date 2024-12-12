import { Recommend } from '../../../dat/index.js';
import validate from '../../../com/validate.js';
import errors from '../../../com/errors.js';
import mongoose from 'mongoose';

const { SystemError, NotFoundError } = errors;

const getRecommendByUser = async (userId) => {
    validate.id(userId, 'userId');

    try {
        const recommends = await Recommend.find({
            author: { $in: [new mongoose.Types.ObjectId(userId)] },
        })
            .populate('author', 'username')
            .sort({ date: -1 })
            .lean()

        if (!recommends) {
            throw new NotFoundError('No recomendations found for this user')
        }

        return recommends.map(recommend => {
            recommend.id = recommend._id.toString()
            delete recommend._id

            if (recommend.author._id) {
                recommend.author.id = recommend.author._id.toString()
                delete recommend.author._id
            }

            return recommend
        })
    } catch (error) {
        throw new SystemError(error.message)
    }

}

export default getRecommendByUser
