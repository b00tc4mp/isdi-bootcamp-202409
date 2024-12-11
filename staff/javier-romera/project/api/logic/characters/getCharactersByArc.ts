import { User, Arc, Character } from 'dat'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId: string, arc: string) => {
    validate.id(userId, 'userId')
    validate.arc(arc)

    arc = arc.replaceAll('-', ' ')

    return (async () => {
        let user, foundArc, characters

        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        try {
            foundArc = await Arc.findOne({ name: arc })
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        if (!foundArc) throw new NotFoundError('arc not found')

        try {
            characters = await Character.find({ firstArc: foundArc.id })
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        return characters
    })()
}