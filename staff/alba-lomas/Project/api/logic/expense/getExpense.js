


import { User, Expense } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, expenseId) => {
    validate.id(userId, 'userId')
    validate.id(expenseId, 'expenseId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('Usuario no encontrado')

            return Expense.findOne({ _id: expenseId, author: userId })
                .sort({ date: -1 }) // ordenar por fecha
                .lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(expense => {
            if (!expense) throw new NotFoundError('Gasto no encontrado')

            expense.id = expense._id.toString()
            delete expense._id 

            if (expense.author._id) {
                expense.author.id = expense.author._id.toString()
                delete expense.author._id
            }
            return expense
        })
}