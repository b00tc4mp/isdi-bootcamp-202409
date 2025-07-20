import { Habit, User } from '../../../dat/models.js'

import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

export default (userId, name, category, subcategory, emoji) => {
    validate.id(userId, 'userId')
    validate.name(name)
    validate.text(category)
    validate.text(subcategory)
    validate.emoji(emoji)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then (user => {
            if(!user) throw new NotFoundError('user not found')

            const habit = new Habit({
                name,
                emoji,
                category,
                subcategory,
                user: userId,
                createdAt: new Date ()
            })
        
            return habit.save()
                .catch(error => {
                    throw new SystemError(error.message)
                })
})
}


