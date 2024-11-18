import 'dotenv/config'
import db, { User, Post } from './index.js'

db.connect(process.env.MONGO_URL)
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => Promise.all([User.create({
        name: 'Micho Tito',
        email: 'micho@tito.com',
        username: 'Michotacorta',
        password: '123123123',
        role: 'regular'
    }),
    User.create({
        name: 'Elber Galarga',
        email: 'elber@tito.com',
        username: 'ElberGalarga',
        password: '123123123',
        role: 'moderator'
    })]))
    .then(([micho, elber]) => Promise.all([
        Post.create({
            author: micho.id,
            image: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGc5ZWd6c214bDYzczIzbmExM3JqYmphZmt1MjE3eXhlc2JkaGZsaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hiQndt1hi1Lva/giphy.webp',
            text: 'Un hambreeee'
        }),
        Post.create({
            author: elber.id,
            image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHFiZ2ttZXdnd2Vkdjl3d29kcW9nanE2cjkyZnl1eGs1aWY4dHd3cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vFtWp05vBYnMQ/giphy.webp',
            text: 'tilin tilin'
        })
    ]))
    .catch(console.error)
    .finally(() => db.disconnect())