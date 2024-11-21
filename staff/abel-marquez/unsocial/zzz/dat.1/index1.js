import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017')

client.connect()
    .then(connection => {
        console.log('connected')

        const db = connection.db('unsocial')

        const users = db.connection('users')
        const posts = db.connection('posts')
        
        users.find({}).toArray().then(users => console.log(users))
        posts.find({}).toArray().then(posts => console.log(JSON.stringify(posts,null, 2)))
        
    })