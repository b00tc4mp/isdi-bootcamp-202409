


import { User, Expense } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new NotFoundError('Usuario no encontrado')

            return Expense.find({ author: userId })
                .populate('author', 'name')
                .sort({ date: -1 })
                .lean()
        })
        .then(expenses => {
            expenses.forEach(expense => {
                expense.id = expense._id.toString()
                delete expense._id

                if (expense.author._id) {
                    expense.author.id = expense.author._id.toString()
                    delete expense.author._id
                }
            })
            return expenses
        })
}