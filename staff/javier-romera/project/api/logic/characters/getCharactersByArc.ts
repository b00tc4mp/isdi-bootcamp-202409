import { User, TUser, Arc, TArc, Character, TCharacter } from 'dat'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId: string, arc: string): Promise<TCharacter[] | undefined> => {
    validate.id(userId, 'userId')
    validate.arc(arc)

    arc = arc.replaceAll('-', ' ')

    return (async (): Promise<TCharacter[] | undefined> => {
        let user, foundArc, characters

        try {
            user = await User.findById(userId).lean<TUser>()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!user) throw new NotFoundError('user not found')

        try {
            foundArc = await Arc.findOne<TArc>({ name: arc })
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        try {
            characters = await Character.find({ firstArc: foundArc!.id }).select('-_id').lean<TCharacter[]>()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        return characters
    })()
}