import 'dotenv/config'

import fs from 'fs/promises'
import bcrypt from 'bcryptjs'

import db, { User, Product } from './index.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => Promise.all([User.deleteMany(), Product.deleteMany()]))
  .then(() => fs.readFile('./users.csv', 'utf-8'))
  .then(csv => {
    const lines = csv.split('\n')

    const creations = lines.map(line => {
      const [name, email, username, password, role] = line.split(',').map(item => item.trim())

      return User.create({ name, email, username, password: bcrypt.hashSync(password, 10), role })
    })

    return Promise.all(creations)
  })
  .then(users => {
    return fs.readFile('./products.csv', 'utf-8')
      .then(csv => {
        const lines = csv.split('\n')

        const creations = lines.map(line => {
          const [name, image, description] = line.split(',').map(item => item.trim())

          const likes = []
          const likesNumber = randomNumber(0, users.length)

          for (let i = 0; i < likesNumber; i++) {
            let user = randomElement(users)

            while (likes.includes(user.id))
              user = randomElement(users)

            likes.push(user.id)
          }

          const dislikes = []
          const dislikesNumber = randomNumber(0, users.length)

          for (let i = 0; i < dislikesNumber; i++) {
            let user = randomElement(users)

            while (dislikes.includes(user.id))
              user = randomElement(users)

            dislikes.push(user.id)
          }

          return Product.create({ name, image, description, likes, dislikes })
        })

        return Promise.all(creations)
      })
  })
  .catch(console.error)
  .finally(() => db.disconnect())

const randomElement = array => array[Math.floor(Math.random() * array.length)]
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min 