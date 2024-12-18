import { User, Recommend } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

const downVote = (userId, recommendId) => {
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

            const { downVotes, upVotes } = recommend

            const upVoteIndex = upVotes.findIndex(userObjectId => userObjectId.equals(userId))

            if (upVoteIndex > -1) upVotes.splice(upVoteIndex, 1)

            const index = downVotes.findIndex(userObjectId => userObjectId.equals(userId))

            if (index < 0)
                downVotes.push(userId)
            else
                downVotes.splice(index, 1)

            return recommend.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}

export default downVote
