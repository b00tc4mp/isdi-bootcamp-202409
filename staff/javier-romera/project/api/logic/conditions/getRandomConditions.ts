import { User, Condition } from 'dat'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default function getRandomConditions(userId: string) {
    validate.id(userId, 'userId')

    return (async () => {
        let user, columnConditions, rowConditions
        let parsedColumnConditions: any = []
        let parsedRowConditions: any = []

        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        try {
            columnConditions = await Condition.find({ direction: 'column' }).select('-_id').lean()
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        try {
            rowConditions = await Condition.find({ direction: 'row' }).select('-_id').lean()
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        while (parsedColumnConditions.length < 3) {
            const randomNumber = Math.floor(Math.random() * columnConditions!.length)

            const possibleCondition = columnConditions![randomNumber]

            const alreadyExists = parsedColumnConditions.some((con: any) => con.value === possibleCondition.value)

            if (!alreadyExists) parsedColumnConditions.push(possibleCondition)
        }

        while (parsedRowConditions.length < 3) {
            const randomNumber = Math.floor(Math.random() * rowConditions!.length)

            const possibleCondition = rowConditions![randomNumber]

            const alreadyExists = parsedRowConditions.some((con: any) => con.text === possibleCondition.text)

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