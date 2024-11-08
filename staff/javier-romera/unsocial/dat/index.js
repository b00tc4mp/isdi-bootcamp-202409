import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017')

client.connect()
    .then(connection => {
        console.log('connected')

        const db = connection.db('unsocial') // conexión a la bd de unsocial

        const users = db.collection('users') // accedemos a la colección de usuarios
        const posts = db.collection('posts') // accedemos a la colección de posts

        // TESTING

        // INSERT A USER IN THE DB

        /* users.insertOne({ name: "Ana Gonzalez", email: "ana@gonzalez.com", username: "anagonzalez", password: "123123123" }) */ //WORKS 👍

        // UPDATE A USER IN THE DB

        /* users.updateOne({ _id: new ObjectId('672cdf513986998108c227a7') }, { $set: { name: 'Anna', username: 'annagonzalez', email: 'anna@gonzalez' } }) */ // WORKS 👍

        // DELETE A USER IN THE DB

        /* users.deleteOne({ _id: new ObjectId('672ccadc9c76adcf62400b88') }) */ // WORKS 👍

        // INSERT A POST IN THE DB

        /* posts.insertOne({ author: new ObjectId('672cdda5632212c60f4a9973'), image: 'https://png.pngtree.com/background/20230616/original/pngtree-tigers-cartoon-picture-of-a-real-tigers-cartoon-character-picture-image_3623210.jpg', text: "el gato garfield", date: new Date(), likes: [], comments: [] }) */ // WORKS 👍

        // UPDATE A POST IN THE DB

        /* posts.updateOne({ _id: new ObjectId('672ce5f2d47d2ce80ee40b13') }, { $set: { text: 'ojala funcione' } }) */ // WORKS 👍

        // DELETE A POST IN THE DB

        /* posts.deleteOne({ _id: new ObjectId('672ce5f2d47d2ce80ee40b13') }) */ // WORKS 👍

        // PRINT POR TERMINAL DE USERS Y POSTS

        /* users.findOne({ _id: new ObjectId('672cdf513986998108c227a7') }).then(user => console.log(user)) */ // WORKS 👍
        users.find({}).toArray().then(users => console.log(users))
        posts.find({}).toArray().then(posts => console.log(JSON.stringify(posts, null, 3))) // Aquí stringify ==> mas bonico + comments desglosados
    })