import db from 'dat'

import { validate } from 'com'

const { ObjectId } = db


export default (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)

    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch((error) => {
            new Error(error.message)
        })
        .then(user => {
            if (!user) throw new Error('user not found')
            return db.posts.insertOne({ author: userId, image, text, date: new Date(), likes: [], comments: [] })
                .then(_ => { })
                .catch(error => console.error(error))
        })


}