import db from 'dat'

import { validate } from 'apu'

export default (username, password) => {
    validate.username(username)
    validate.password(password)

    return db.users.findOne({ username, password })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('cagaste')

            return user._id.toString()
        })
}