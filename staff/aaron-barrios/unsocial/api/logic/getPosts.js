import { validate } from './helpers/index.js'

import db from 'dat'

const { ObjectId } = db

export default userId => {
    validate.id(userId, 'userId')

    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.posts.find().forEach(post => { console.log(post) })
                .catch(error => { new Error(error.message) })
            // .then(post => {
            //     if (!post) throw new Error('post not found')
            // })
        })

}