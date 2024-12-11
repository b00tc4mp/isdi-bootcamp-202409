import { User, Recommend } from '../../../dat/index.js'
import validate from '../../../com/validate.js'; import errors from '../../../com/errors.js';

const { SystemError, NotFoundError } = errors

const upVote = (userId, recommendId) => {
    validate.id(userId, 'userId')
    validate.id(recommendId, 'recommendId')

    return Promise.all([
        User.findById(userId).lean(),
        Recommend.findById(recommendId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, recommend]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!recommend) throw new NotFoundError('recommendation not found')

            const { upVotes } = recommend

            const index = upVotes.findIndex(userObjectId => userObjectId.equals(userId))

            if (index < 0)
                upVotes.push(userId)
            else
                upVotes.splice(index, 1)

            return recommend.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}

export default upVote

/*control netVote logic from the front-end for version 0.0, but 
consider a refactor to protect vote arrays from the back end */