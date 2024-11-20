import 'dotenv/config'
import db, { User, Post } from './index.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => Promise.all([User.create({
        name: 'Juan Pablo',
        email: 'juan@pablo.com',
        username: 'juanpablo',
        password: '123456',
        role: 'regular'
    }),
    User.create({
        name: 'Pepito Grillo',
        email: 'pepito@grillo.com',
        username: 'pepitogrillo',
        password: '123456',
        role: 'moderator'
    }),
    User.create({
        name: 'Steve Jobs',
        email: 'steve@jobs.com',
        username: 'stevejobs',
        password: '123456',
        role: 'regular'
    })
    ]))
    .then(([juan, pepito]) => Promise.all([
        Post.create({
            author: juan.id,
            image: 'https://media.giphy.com/media/vzw2OQvtUDrtC/giphy.gif?cid=790b7611m3hreasz5j156zmpsxs28cssnuz5j7uu2f1tki3b&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            text: 'i can fly'
        }),
        Post.create({
            author: pepito.id,
            image: 'https://media.giphy.com/media/k3qEYZH7P1i0M/giphy.gif?cid=790b7611m3hreasz5j156zmpsxs28cssnuz5j7uu2f1tki3b&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            text: 'oh, it\'s magic'
        })
    ]))
    .catch(console.error)
    .finally(() => db.disconnect())