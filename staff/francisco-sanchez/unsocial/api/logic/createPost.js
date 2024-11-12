import db from 'dat'
import { validate, errors } from 'com'
//import { storage, uuid } from '../data/index.js'

const { ObjectId } = db

const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)

    const userObjectId = ObjectId.createFromHexString(userId)

    return db.users.findOne({ _id: userObjectId })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const userObjectId = ObjectId.createFromHexString(userId)

            //Si encontramos el usuario ya podemos insertar
            return db.posts.insertOne({
                image: image,
                text: text,
                author: userObjectId,
                date: new Date,
                likes: [],
                comments: []
            })
                .then(_ => { }) //Este callback no devuelve nada
                .catch(error => {
                    throw new SystemError(error.message)
                })

        })
    // const { users, posts } = storage

    // const found = users.some(({ id }) => id === userId)

    // if (!found) throw new Error('user not found')

    // const post = {
    //     id: uuid(),
    //     image: image,
    //     text: text,
    //     author: userId,
    //     date: new Date,
    //     likes: [],
    //     comments: []
    // }

    // posts.push(post)

    // storage.posts = posts
}