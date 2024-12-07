import { User, Condition } from 'dat'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default function getRandomConditions(userId: string) {
    validate.id(userId)

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
            // console.log('intentando las columnas')
            const possibleCondition = columnConditions![randomNumber]

            const alreadyExists = parsedColumnConditions.some((con: any) => con.indexes[0] === possibleCondition.indexes[0])

            if (!alreadyExists) parsedColumnConditions.push(possibleCondition)
        }

        while (parsedRowConditions.length < 3) {
            const randomNumber = Math.floor(Math.random() * rowConditions!.length)
            // console.log('intentando las filas')
            const possibleCondition = rowConditions![randomNumber]

            const alreadyExists = parsedRowConditions.some((con: any) => con.indexes[0] === possibleCondition.indexes[0])

            if (!alreadyExists) parsedRowConditions.push(possibleCondition)
        }

        const conditions = [...parsedColumnConditions, ...parsedRowConditions!]

        return conditions
    })()
}