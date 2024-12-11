import { validate, errors } from 'com'
import { User } from 'dat'

const { NotFoundError, SystemError } = errors

export default (userId: string, status: Number, from: string): Promise<void> | undefined => {
    validate.id(userId, 'userId')
    validate.status(status)

    let newStatus

    if (status === 0 && from === 'onepiecedle') newStatus = 1
    else if (status === 0 && from === 'onedoku') newStatus = 2
    else if (status === 1 && from === 'onepiecedle') return
    else if (status === 1 && from !== 'onepiecedle') newStatus = 3
    else if (status === 2 && from === 'onedoku') return
    else if (status === 2 && from !== 'onedoku') newStatus = 3
    else if (status === 3) return

    return (async (): Promise<void> => {
        let user

        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        try {
            await User.updateOne({ _id: userId }, { $set: { status: newStatus } })
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }
    })()
}