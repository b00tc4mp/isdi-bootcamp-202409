import { User, Recommend } from 'dat'
import { validate, errors } from 'com'

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

            const { upVotes, downVotes } = recommend

            const downVoteIndex = downVotes.findIndex(userObjectId => userObjectId.equals(userId))

            if (downVoteIndex > -1) downVotes.splice(downVoteIndex, 1)

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
