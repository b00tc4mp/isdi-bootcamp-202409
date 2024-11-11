import { validate } from './helpers/index.js'

import db from 'dat'

const { ObjectId } = db

// ----- POSTS STUFF ------
export default (userId, text, image) => {
    validate.id(userId, 'userId')
    validate.text(text)
    validate.image(image)

    const userObjectId = ObjectId.createFromHexString(userId)

    return db.users.findOne({ _id: userObjectId })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.posts
                .insertOne({ author: userObjectId, text, image, likes: [], comments: [], date: new Date })
                .catch((error) => { throw new Error(error.message) })
        })
        .then((_) => { console.log('Created post') })
}