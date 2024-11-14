import mongoose from 'mongoose'
import models from './models.js'

const { ObjectId } = mongoose.Types

function connect(mongoUrl) {
    return mongoose.connect(mongoUrl)

        .then(() => { //otra promesa (es como motor)
            const db = mongoose.connection.db

            this.users = db.collection('users')
            this.posts = db.collection('posts')

            this.disconnect = () => mongoose.disconnect()
        })
}

const db = {
    connect,
    users: null,
    posts: null,
    disconnect: null,
    ObjectId
}

export default db

export {
    models
}