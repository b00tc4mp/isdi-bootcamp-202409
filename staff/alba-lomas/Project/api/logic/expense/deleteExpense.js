


import { User, Expense } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export default async (userId, expenseId) => {
    validate.id(userId, 'userId')
    validate.id(expenseId, 'expenseId')

    try {
        const [user, expense] = await Promise.all([
            User.findById(userId).lean(),
            Expense.findById(expenseId).lean(),
        ])

        if (!user) throw new NotFoundError('No se encuentra el usuario')
        if (!expense) throw new NotFoundError('No se encuentra el gasto')
        if (!expense.author.equals(userId)) throw new OwnershipError('El usuario no es el autor del gasto')

        await Expense.findByIdAndDelete(expenseId)
    } catch (error) {
        if (error instanceof SystemError || error instanceof NotFoundError || error instanceof OwnershipError) {
            throw error
        }
        throw new SystemError(error.message)
    }
}