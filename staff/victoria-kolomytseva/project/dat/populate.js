import 'dotenv/config'
import db, { User, Post } from './index.js'

db.connect(process.env.MONGO_URL)
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => Promise.all([
        User.create({
            name: "Juan Pérez",
            email: "juan.perez@example.com",
            username: "juanperez",
            password: "123123123",

        }),
        User.create({
            name: "María López",
            email: "maria.lopez@example.com",
            username: "marialopez",
            password: "secure456"
        }),
        User.create({
            name: "Luis Martínez",
            email: "luis.martinez@example.com",
            username: "luismartinez",
            password: "luis1234",

        })]))

    .then(([juan, maria, luis]) => Promise.all([
        Post.create({
            author: juan.id,
            image: ,
            text: 
            }),
        Post.create({
            author: maria.id,
            image: ,
            text: 
            }),
        Post.create({
            author: luis.id,
            image: ,
            text: 
            })
    ]))
    .catch(console.error)
    .finally(() => db.disconnect())