import { User, Post } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)

    return (async () => {
        let user

        try {
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        try {
            await Post.create({ author: userId, image, text })
        } catch (error) {
            throw new SystemError(error.message)
        }
        //.then(_ => { })
    })()
}