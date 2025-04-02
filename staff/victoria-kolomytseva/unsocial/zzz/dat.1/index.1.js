import { MongoClient, ObjectId } from 'mongodb'

function connect(mongoUrl)
const clien
const client = new MongoClient('mongodb://127.0.0.1:27017')

client.connect()
    .then(connection => {
        console.log('connected')

        const db = connection.db('unsocial')

        const users = db.collection('users')
        const posts = db.collection('posts')

        // users.deleteOne({ "_id": new ObjectId("672d14799d4c22706c0d8190") })

        users.find({}).toArray().then(users => console.log(users))

        posts.find({}).toArray().then(posts => console.log(JSON.stringify(posts, null, 2)))
    })

