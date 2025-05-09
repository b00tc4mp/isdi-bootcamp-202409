import 'dotenv/config'
import db, { User, Post } from './index.js'

//Its use in case we have db issues or empty???

db.connect(process.env.MONGO_URL)
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => Promise.all([User.create({
        name: 'Peper Tan',
        email: 'peper@tan.com',
        username: 'pepertan',
        password: '123123123',
        role: 'regular'
    }),
    User.create({
        name: 'Dendy warling',
        email: 'dendy@warling.com',
        username: 'dendywarling',
        password: '123123123',
        role: 'moderator'
    })]))
    .then(([peper, dendy]) => Promise.all([
        Post.create({
            author: peper.id,
            image: 'https://static.wikia.nocookie.net/heroe/images/5/5e/Peter_Pan_en_blanco.png/revision/latest?cb=20230303050514&path-prefix=es',
            text: 'ma name is jeff'
        }),
        Post.create({
            author: dendy.id,
            image: 'https://static.wikia.nocookie.net/disney/images/f/f6/Wendy_Darling.png/revision/latest?cb=20150314205407&path-prefix=es',
            text: 'Yep'
        })
    ]))
    .catch(console.error)
    .finally(() => db.disconnect())