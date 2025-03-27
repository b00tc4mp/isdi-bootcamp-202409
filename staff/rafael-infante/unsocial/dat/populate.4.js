import 'dotenv/config'
import fs from 'fs/promises'
import bcrypt from 'bcryptjs'

import db, { User, Post } from './index.js' // Asegúrate de que esta ruta sea correcta

db.connect(process.env.MONGO_URL_TEST)
  .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
  .then(() => fs.readFile('./users.csv', 'utf-8'))
  .then((csv) => {
    const lines = csv.split('\n').filter(Boolean)

    // Crear usuarios desde el archivo CSV
    const userCreations = lines.map((line) => {
      const [name, email, password, role] = line.split(',').map((item) => item.trim())

      return User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role,
        reviews: [], // Inicializar reviews vacío
      })
    })

    return Promise.all(userCreations)
  })
  .then((users) => {
    return fs.readFile('./posts.csv', 'utf-8').then((csv) => {
      const lines = csv.split('\n').filter(Boolean)

      // Crear posts desde el archivo CSV
      const postCreations = lines.map((line) => {
        const [email, image, text, date] = line.split(',').map((item) => item.trim())

        const user = users.find((u) => u.email === email)
        if (!user) throw new Error(`User with email ${email} not found`)

        return Post.create({
          author: user._id,
          image,
          text,
          date: new Date(dastaff / rafael - infante / unsocial / dat / populate.jste),
          reviews: [], // Inicializar reviews vacío
        })
      })

      return Promise.all(postCreations).then((posts) => ({ users, posts }))
    })
  })
  .then(({ users, posts }) => {
    const reviewCreations = []

    // Crear al menos 3 reviews por usuario
    users.forEach((user) => {
      const reviewers = getRandomElements(
        users.filter((u) => u._id.toString() !== user._id.toString()),
        3
      )

      reviewers.forEach((reviewer) => {
        const calification = randomNumber(1, 5)
        const text =
          calification <= 2
            ? `User ${user.name} could improve. Not satisfied with the experience.`
            : `User ${user.name} was fantastic! Highly recommend.`

        user.reviews.push({
          author: reviewer._id,
          text,
          calification,
          date: new Date(),
        })
      })

      reviewCreations.push(user.save())
    })

    // Crear al menos 3 reviews por post
    posts.forEach((post) => {
      const reviewers = getRandomElements(users, 3)

      reviewers.forEach((reviewer) => {
        const calification = randomNumber(1, 5)
        const text =
          calification <= 2
            ? `Post "${post.text}" was disappointing. Could be better.`
            : `Post "${post.text}" was excellent! Really appreciated.`

        post.reviews.push({
          author: reviewer._id,
          text,
          calification,
          date: new Date(),
        })
      })

      reviewCreations.push(post.save())
    })

    return Promise.all(reviewCreations)
  })
  .then(() => console.log('Database populated successfully with users, posts, and reviews!'))
  .catch(console.error)
  .finally(() => db.disconnect())

// Funciones auxiliares
const getRandomElements = (array, count) => {
  const shuffled = array.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
