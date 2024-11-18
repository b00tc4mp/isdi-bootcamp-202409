import 'dotenv/config'
import db, { User, Post } from './index.js'

db.connect(process.nextTick.MONGO_URL)
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => Promise.all([User.create({
        name: 'Xavier',
        email: 'xa@vi.com',
        username: 'xavi',
        password: '123123123',
        role: 'regular'
    }),
    User.create({
        name: 'Anna',
        email: 'an@na.com',
        username: 'anna',
        password: '123123123',
        role: 'moderator'
    })]))
    .then(([xavi, anna]) => Promise.all([
        Post.create({
            author: xavi.id,
            image: 'https://media.giphy.com/media/vzw2OQvtUDrtC/giphy.gif?cid=790b7611m3hreasz5j156zmpsxs28cssnuz5j7uu2f1tki3b&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            text: 'I can fly'
        }),
        Post.create({
            author: anna.id,
            image: 'https://media.giphy.com/media/k3qEYZH7P1i0M/giphy.gif?cid=790b7611m3hreasz5j156zmpsxs28cssnuz5j7uu2f1tki3b&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            text: 'oh, it\'s magic'
        })
    ]))
    .catch(console.error)
    .finally(() => db.disconnect())