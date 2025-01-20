import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017')

client.connect()
    .then(connection => {
        console.log('connected')

        const db = connection.db('unsocial')

        const users = db.collection('users')
        const posts = db.collection('posts')

        //users.insertOne({ name: 'Xavi', email: 'xa@vi.com', username: 'xavi', password: '123123123' })

        //users.updateOne({ _id: new ObjectId('672cdd9675dacab5fa985a93') }, { $set: { name: 'Xavi', mail: 'xa@vi.com', username: 'xavi' } })

        //users.deleteOne({ _id: new ObjectId('672cddbe5474db0b50111c40') })

        //posts.insertOne({ author: new ObjectId('672cdd9675dacab5fa985a93'), image: 'https://www.travel-xperience.com/sites/default/files/noruega_al_completo.jpg', text: 'I love Norway', date: new Date(), likes: [], saves: [], comments: [] })

        //posts.updateOne({ _id: new ObjectId('672ccdc0209b1378507975b1') }, { $set: { text: 'Ojalá funcione' } })

        //posts.deleteOne({ _id: new ObjectId('672ce5cf4f475de8ed5c169b') })

        users.findOne({ _id: new ObjectId('672cdd9675dacab5fa985a93') }).then(user => console.log(user))

        users.find({}).toArray().then(users => console.log(users))

        posts.find({}).toArray().then(posts => console.log(JSON.stringify(posts, null, 2)))
    })