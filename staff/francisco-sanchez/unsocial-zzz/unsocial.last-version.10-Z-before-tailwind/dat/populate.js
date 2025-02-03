import 'dotenv/config'
import db, { User, Post } from './index.js'

db.connect(process.env.MONGO_URL)
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => Promise.all([
        User.create({
            name: 'Risto',
            email: 'risto@risto.com',
            username: 'risto',
            password: 'risto',
            role: 'moderator'
        }),
        User.create({
            name: 'Sauron',
            email: 'sauron@middleearth.com',
            username: 'sauron',
            password: 'sauron',
            role: 'regular'
        }),
        User.create({
            name: 'Aragorn',
            email: 'aragorn@middleearth.com',
            username: 'aragorn',
            password: 'aragorn',
            role: 'regular'
        })
    ]))
    .then(([risto, sauron, aragorn]) => Promise.all([
        Post.create({
            author: risto.id,
            image: 'https://vetmarlborough.co.nz/wp-content/uploads/cat-facts.jpg',
            text: 'meeeeeeaaaaau'
        }),
        Post.create({
            author: sauron.id,
            image: 'https://static.wikia.nocookie.net/lugaresesdla/images/6/6a/Mordor.png/revision/latest?cb=20180329121224&path-prefix=es',
            text: 'My home'
        }),
        Post.create({
            author: aragorn.id,
            image: 'https://sm.ign.com/t/ign_latam/screenshot/default/aragorn11_rmuk.1280.jpg',
            text: 'True king'
        })
    ]))