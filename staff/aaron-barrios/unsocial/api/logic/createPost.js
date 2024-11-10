import { validate } from './helpers/index.js'

import db from 'dat'

const { ObjectId } = db

// ----- POSTS STUFF ------
export default (userId, text, image) => {
    validate.id(userId, 'userId')
    validate.text(text)
    validate.image(image)

    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.posts
                .insertOne({ author: userId, text, image, likes: [], comments: [], date: new Date })
                .then((user) => {
                    if (!user) throw new Error('user not found')
                })
                .then((_) => {
                    console.log('Created post')
                })
                .catch((error) => {
                    throw new Error(error.message)
                })
        })
}