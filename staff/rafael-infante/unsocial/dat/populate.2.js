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
          date: new Date(date),
          reviews: [], // Inicializar reviews vacío
        })
      })

      return Promise.all(postCreations).then((posts) => ({ users, posts }))
    })
  })
  .then(({ users, posts }) => {
    const reviewCreations = []

    // Agregar reviews a usuarios
    users.forEach((user) => {
      const randomReviewer = randomElement(users.filter((u) => u._id.toString() !== user._id.toString()))

      user.reviews.push({
        author: randomReviewer._id,
        text: `Review for user ${user.name}`,
        calification: randomNumber(1, 5),
        date: new Date(),
      })

      reviewCreations.push(user.save())
    })

    // Agregar reviews a posts
    posts.forEach((post) => {
      const randomReviewer = randomElement(users)

      post.reviews.push({
        author: randomReviewer._id,
        text: `Review for post: "${post.text}"`,
        calification: randomNumber(1, 5),
        date: new Date(),
      })

      reviewCreations.push(post.save())
    })

    return Promise.all(reviewCreations)
  })
  .then(() => console.log('Database populated successfully with users, posts, and reviews!'))
  .catch(console.error)
  .finally(() => db.disconnect())

// Funciones auxiliares
const randomElement = (array) => array[Math.floor(Math.random() * array.length)]

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
