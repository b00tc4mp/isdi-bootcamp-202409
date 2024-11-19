import 'dotenv/config'
import db, { User, Post } from './index.js'

db.connect(process.env.MONGO_URL)
  .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
  .then(() => Promise.all([User.create({
    name: 'Cris Beriso',
    email: 'cris@beriso.com',
    username: 'beriso',
    password: 'criscris',
    role: 'moderator'
  }),
  User.create({
    name: 'Yannick',
    email: 'yan@nick.com',
    username: 'yanscf',
    password: 'criscris',
    role: 'regular'
  })]))
  .then(([cris, yan]) => Promise.all([
    Post.create({
      author: cris.id,
      image: 'https://www.tiendanimal.es/articulos/wp-content/uploads/2010/06/alimentar-cachorro.jpg',
      text: 'I love animals'
    }),
    Post.create({
      author: yan.id,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR30KLozTwK_j-Gp4oU7vaomlxKWFVrs3-9Gw&s',
      text: 'I love this sport'
    })
  ]))
  .catch(console.error)
  .finally(() => db.disconnect())