import { User, Condition } from 'dat'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default function getRandomConditions(userId: string) {
    validate.id(userId)

    return (async () => {
        let user, columnConditions, rowConditions

        try {
            user = await User.findById(userId)
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        try {
            columnConditions = await Condition.find({ direction: 'column' })
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        try {
            rowConditions = await Condition.find({ direction: 'row' })
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        const conditions = [...columnConditions!, ...rowConditions!]

        return conditions
    })()
}