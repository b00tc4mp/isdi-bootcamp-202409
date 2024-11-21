import 'dotenv/config'
import db, { User, Post } from './index.js'

db.connect(process.env.MONGO_URL)
  .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
  .then(() => Promise.all([

    User.create({
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
    }),
    User.create({
      name: 'Captain Hook',
      email: 'captain@hook.com',
      username: 'captainhook',
      password: '123123123',
      role: 'regular'
    })
  ]))
  .then(([peter, wendy]) => Promise.all([
    Post.create({
      author: peter.id,
      image: 'https://media.giphy.com/media/vzw2OQvtUDrtC/giphy.gif?cid=790b7611m3hreasz5j156zmpsxs28cssnuz5j7uu2f1tki3b&ep=v1_gifs_search&rid=giphy.gif&ct=g',
      text: 'i can fly'
    }),
    Post.create({
      author: wendy.id,
      image: 'https://media.giphy.com/media/k3qEYZH7P1i0M/giphy.gif?cid=790b7611m3hreasz5j156zmpsxs28cssnuz5j7uu2f1tki3b&ep=v1_gifs_search&rid=giphy.gif&ct=g',
      text: 'oh, it\'s magic'
    })
  ]))
  .catch(console.error)
  .finally(() => db.disconnect())