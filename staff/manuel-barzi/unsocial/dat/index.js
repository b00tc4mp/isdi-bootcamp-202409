import { MongoClient } from 'mongodb'

function connect(mongoUrl) {
    const client = new MongoClient(mongoUrl)

    return client.connect()
        .then(connection => {
            const db = connection.db()

            this.users = db.collection('users')
            this.posts = db.collection('posts')
        })
}

const db = {
    connect,
    users: null,
    posts: null
}

export default db