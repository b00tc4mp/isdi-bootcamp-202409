import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017')

client.connect()
  .then(connection => {
    console.log('connected')

    const db = connection.db('unsocial')

    const users = db.collection('users')
    const posts = db.collection('posts')

    //users.insertOne({ name: 'Petter Pan', email: 'petter@pan.com', username: 'petterpan', password: '123123123' })

    posts.deleteOne({ _id: new ObjectId('672cd979b60c726c780d8191') })
    // posts.insertOne({ author: new ObjectId('672cc8ffb6b0ff7dbc0d8190'), image: 'https://wakyma.com/blog/wp-content/uploads/2017/07/Por-qu%C3%A9-los-gatos-tricolor-son-HEMBRAS', text: 'Miau', date: ISODate('2024-10-28T08:18:09.861Z'), likes: [], comments: [] })

    users.find({}).toArray().then(users => console.log(users))
    posts.find({}).toArray().then(posts => console.log(JSON.stringify(posts, null, 2)))
  })