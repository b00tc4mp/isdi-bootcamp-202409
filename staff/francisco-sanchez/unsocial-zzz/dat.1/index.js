import { MongoClient, ObjectId } from "mongodb"

//const client = new MongoClient('mongodb://127.0.0.1:27017')

function connect(mongoUrl) {
    const client = new MongoClient(mongoUrl)

    return client.connect()
        .then(connection => {
            const db = connection.db()

            this.users = db.collection('users')
            this.posts = db.collection('posts')

            //creamos un método para desconectar
            this.disconnect = () => connection.close()
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

/*client.connect()
    .then(connection => {
        console.log('Database connected')

        const db = connection.db('unsocial')

        const users = db.collection('users')
        const posts = db.collection('posts')

        users.find({}).toArray().then(users => console.log(users))
        users.find({}).toArray().then(posts => console.log(JSON.stringify(posts, null, 2)))


        users.insertOne({ name: 'pepe', username: 'pepet2', email: 'pepet2@marieta.com', password: '1234' })
        users.find({}).toArray().then(users => console.log(users))

    })*/