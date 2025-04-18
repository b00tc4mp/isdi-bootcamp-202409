import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)

    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('User not found')

            return db.posts.insertOne({ image: image, text: text, author: ObjectId.createFromHexString(userId), date: new Date(), likes: [], saves: [], comments: [] })
                .catch(error => {
                    if (error.code === 11000) throw new Error('Post already exists')

                    throw new Error(error.message)
                })
                .then(_ => { })
        })
}