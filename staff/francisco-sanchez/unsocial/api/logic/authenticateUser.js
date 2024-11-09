//import { storage } from '../data/index.js'
import db from 'dat'
import validate from './helpers/validate.js'

export default (username, password) => {
    validate.username(username)
    validate.password(password)


    return db.users.findOne({ username, password })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('wrong credentials')

            return user._id.toString()
        })

    /*const { users } = storage

    const user = users.find(user => user.username === username && user.password === password)

    if (user === undefined)
        throw new Error('wrong credentials')

    return user.id*/
}