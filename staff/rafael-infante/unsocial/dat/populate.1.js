import 'dotenv/config'
import db, { User, Post, Review } from './index.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => Promise.all([User.deleteMany(), Post.deleteMany(), Review.deleteMany()]))
  .then(() =>
    Promise.all([
      User.create({
        name: 'Don Quijote',
        email: 'don@quijote.com',
        password: '123123123',
        role: 'elder',
      }),
      User.create({
        name: 'Don Barriga',
        email: 'don@barriga.com',
        password: '123123123',
        role: 'elder',
      }),
      User.create({
        name: 'Chilin Drina',
        email: 'chilin@drina.com',
        password: '123123123',
        role: 'caregiver',
      }),
    ])
  )
  .then(([ramon, barriga, chilindrina]) =>
    Promise.all([
      Post.create({
        author: ramon.id,
        image:
          'https://media.giphy.com/media/vzw2OQvtUDrtC/giphy.gif?cid=790b7611m3hreasz5j156zmpsxs28cssnuz5j7uu2f1tki3b&ep=v1_gifs_search&rid=giphy.gif&ct=g',
        text: 'cuido de personas',
      }),
      Post.create({
        author: barriga.id,
        image:
          'https://media.giphy.com/media/k3qEYZH7P1i0M/giphy.gif?cid=790b7611m3hreasz5j156zmpsxs28cssnuz5j7uu2f1tki3b&ep=v1_gifs_search&rid=giphy.gif&ct=g',
        text: 'soy auxiliar',
      }),
      Post.create({
        author: chilindrina.id,
        image:
          'https://media.giphy.com/media/k3qEYZH7P1i0M/giphy.gif?cid=790b7611m3hreasz5j156zmpsxs28cssnuz5j7uu2f1tki3b&ep=v1_gifs_search&rid=giphy.gif&ct=g',
        text: 'nesesito una persona para la mañana',
      }),
    ]).then(([post1, post2, post3]) => ({ users: [ramon, barriga, chilindrina], posts: [post1, post2, post3] }))
  )
  .then(({ users, posts }) =>
    Promise.all([
      Review.create({
        author: users[2].id, // Chilindrina escribe una reseña
        text: 'Great experience helping elders!',
        date: new Date(),
        calification: 5,
      }),
      Review.create({
        author: users[1].id, // Don Barriga escribe una reseña
        text: 'Received excellent care!',
        date: new Date(),
        calification: 4,
      }),
      Review.create({
        author: users[0].id, // Don Ramon escribe una reseña
        text: 'Could be better, but still helpful.',
        date: new Date(),
        calification: 3,
      }),
    ])
  )
  .catch(console.error)
  .finally(() => db.disconnect())
