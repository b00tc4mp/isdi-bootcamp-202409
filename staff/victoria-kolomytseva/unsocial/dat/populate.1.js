import 'dotenv/config'
import db, { User, Post } from './index.js'

db.connect(process.env.MONGO_URL)
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => Promise.all([User.create({
        name: 'Peter Pan',
        email: 'peter@pan.com',
        username: 'peterpan',
        password: '123123123',
        role: 'regular'
    }),
    User.create({
        name: 'Wendy Darling',
        email: 'wendy@darling.com',
        username: 'wendydarling',
        password: '123123123',
        role: 'moderator'
    })]))
    .then(([peter, wendy]) => Promise.all([
        Post.create({
            author: peter.id,
            image: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3FwcmhsdnQxM3huOGdyazV4NXg0Yjd2Y2pwanF4NXZpdWM4cHkyNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5ZZSYqvcH6QppFQGI5/giphy.webp',
            text: 'lunes'
        }),
        Post.create({
            author: wendy.id,
            image: 'https://media4.giphy.com/media/u0LxmF9QVeDoQ/200.webp?cid=82a1493b8vk2t6oy3b4aewwu5agr7x0ibog8fbj1akngx8to&ep=v1_gifs_trending&rid=200.webp&ct=g',
            text: 'jaja'
        })

    ]))
    .catch(console.error)
    .finally(() => db.disconnect())