import { User, Recommend, Comment } from 'dat'
import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

const addComment = (userId, recommendId, text) => {
    validate.id(userId, 'userId')
    validate.id(recommendId, 'recommendId')
    validate.text(text)

    return Promise.all([
        User.findById(userId).lean(),
        Recommend.findById(recommendId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, recommend]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!recommend) throw new NotFoundError('recommendation not found')

            const comment = new Comment({
                author: userId,
                text: text
            })

            recommend.comments.push(comment)

            return recommend.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}

export default addComment

