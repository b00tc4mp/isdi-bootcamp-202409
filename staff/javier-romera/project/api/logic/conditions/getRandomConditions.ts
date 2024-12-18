import { User, TUser, Condition, TCondition } from 'dat'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId: string): Promise<TCondition[]> => {
    validate.id(userId, 'userId')

    return (async (): Promise<TCondition[]> => {
        let user, columnConditions, rowConditions
        let parsedColumnConditions: TCondition[] = []
        let parsedRowConditions: TCondition[] = []

        try {
            user = await User.findById(userId).lean<TUser>()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!user) throw new NotFoundError('user not found')

        try {
            columnConditions = await Condition.find({ direction: 'column' }).select('-_id').lean<TCondition[]>()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        try {
            rowConditions = await Condition.find({ direction: 'row' }).select('-_id').lean<TCondition[]>()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        while (parsedColumnConditions.length < 3) {
            const randomNumber = Math.floor(Math.random() * columnConditions!.length)

            const possibleCondition = columnConditions![randomNumber]

            const alreadyExists = parsedColumnConditions.some((con: TCondition) => con.text === possibleCondition.text)

            if (!alreadyExists) parsedColumnConditions.push(possibleCondition)
        }

        while (parsedRowConditions.length < 3) {
            const randomNumber = Math.floor(Math.random() * rowConditions!.length)

            const possibleCondition = rowConditions![randomNumber]

            const alreadyExists = parsedRowConditions.some((con: TCondition) => con.text === possibleCondition.text)

            if (!alreadyExists) parsedRowConditions.push(possibleCondition)
        }

        parsedColumnConditions[0].indexes = [0, 3, 6]
        parsedColumnConditions[1].indexes = [1, 4, 7]
        parsedColumnConditions[2].indexes = [2, 5, 8]

        parsedRowConditions[0].indexes = [0, 1, 2]
        parsedRowConditions[1].indexes = [3, 4, 5]
        parsedRowConditions[2].indexes = [6, 7, 8]

        const conditions = [...parsedColumnConditions, ...parsedRowConditions]

        return conditions
    })()
}