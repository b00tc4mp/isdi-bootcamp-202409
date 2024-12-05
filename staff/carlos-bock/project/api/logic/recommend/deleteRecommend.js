import { User, Recommend } from '../../../dat/index.js'
import validate from '../../../com/validate.js'; import errors from '../../../com/errors.js';

const { SystemError, NotFoundError, OwnershipError } = errors

const deleteRecommend = (userId, recommendId) => {
    validate.id(userId, 'userId')
    validate.id(recommendId, 'recommendId')

    return Promise.all([User.findById(userId).lean(), Recommend.findById(recommendId).lean()])
        .catch(error => { throw new SystemError(error.messsage) })
        .then(([user, recommend]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!recommend) throw new NotFoundError('recommend not found')
            if (!recommend.author.equals(userId)) throw new OwnershipError('user is not author')

            return Recommend.deleteById(recommendId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}

export default deleteRecommend