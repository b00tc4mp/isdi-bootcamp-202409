import db from 'dat'
import { validate, errors }  from 'com'

const { SystemError, NotfoundError } = errors
const { ObjectId } = db

export default (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)

    const userObjectId = ObjectId.createFromHexString (userId)

    return db.users.findOne({ _id: userObjectId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotfoundError ('user not found')
            
            return db.posts.insertOne({ author: userObjectId, image, text, date: new Date, likes: [], comments: [] })
                .catch(error => { throw new SystemError (error.message) })
        })
        .then(_ => { } )
    }