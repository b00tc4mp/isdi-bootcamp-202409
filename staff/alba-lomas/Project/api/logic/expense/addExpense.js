


import { User, Expense } from 'dat'
import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

export default (userId, amount, type, provider, date) => {
        validate.id(userId)
        validate.number(amount)
        validate.text(type)
        validate.text(provider)
        validate.isoDate(date)

        return User.findById(userId) //findById para buscar en mongo
                .catch(error => { throw new SystemError(error.message) })
                .then(user => {
                        if (!user) throw new NotFoundError('Usuario no encontrado')

                        return Expense.create({ author: userId, amount, type, provider, date })
                                .catch(error => { throw new SystemError(error.message) })
                })
}