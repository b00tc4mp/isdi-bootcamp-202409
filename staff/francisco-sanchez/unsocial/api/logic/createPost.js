import db from 'dat'
import { validate } from './helpers/index.js'
//import { storage, uuid } from '../data/index.js'

const { ObjectId } = db

export default (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)

    return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.posts.insertOne({
                image: image,
                text: text,
                author: ObjectId.createFromHexString(userId),
                date: new Date,
                likes: [],
                comments: []
            })
                .then(_ => { })
                .catch(error => {
                    throw new Error(error.message)
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