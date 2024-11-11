import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)

    const userObjectId = new ObjectId(userId)

    return db.users.findOne({ _id: userObjectId })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('User not found')

            return db.posts.insertOne({ image, text, author: userObjectId, date: new Date, likes: [], saves: [], comments: [] })
                .catch(error => { throw new Error(error.message) })
        })
        .then(_ => { })
}