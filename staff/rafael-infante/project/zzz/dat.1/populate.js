import 'dotenv/config'
import fs from 'fs/promises'
import bcrypt from 'bcryptjs'
import db, { User, Ad } from './index.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))
  .then(() => fs.readFile('./users.csv', 'utf-8'))
  .then((csv) => {
    const lines = csv.split('\n').filter(Boolean)

    // Crear usuarios desde el archivo CSV
    const userCreations = lines.map((line) => {
      const [name, email, password, role, telephone] = line.split(',').map((item) => item.trim())

      return User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role,
        telephone,
        savedAds: [],
      })
    })

    return Promise.all(userCreations)
  })
  .then((users) => {
    return fs.readFile('./ads.csv', 'utf-8').then((csv) => {
      const lines = csv.split('\n').filter(Boolean)

      // Crear anuncios desde el archivo CSV
      const adCreations = lines.map((line) => {
        const [email, image, text, date] = line.split(',').map((item) => item.trim())

        const user = users.find((u) => u.email === email)
        if (!user) throw new Error(`User with email ${email} not found`)

        return Ad.create({
          author: user._id,
          image,
          text,
          date: new Date(date),
          reviews: [],
        })
      })

      return Promise.all(adCreations).then((ads) => ({ users, ads }))
    })
  })
  .then(({ users, ads }) => {
    const reviewCreations = []

    // Crear reseñas para los anuncios
    ads.forEach((ad) => {
      const adAuthor = users.find((u) => u._id.toString() === ad.author.toString())
      const eligibleReviewers = users.filter((u) => u.role !== adAuthor.role)

      const reviewers = getRandomElements(eligibleReviewers, 3) // Obtener al menos 3 revisores

      reviewers.forEach((reviewer) => {
        const calification = randomNumber(1, 5)
        const comment = calification <= 2 ? `Ad "${ad.text}" needs improvement.` : `Ad "${ad.text}" was excellent!`

        ad.reviews.push({
          author: reviewer._id,
          comment,
          calification,
          date: new Date(),
        })
      })

      reviewCreations.push(ad.save())
    })

    // Crear anuncios guardados para los usuarios
    users.forEach((user) => {
      const randomAds = getRandomElements(ads, 2) // Guardar al menos 2 anuncios aleatorios
      user.savedAds = randomAds.map((ad) => ad._id)
      reviewCreations.push(user.save())
    })

    return Promise.all(reviewCreations)
  })
  .then(() => console.log('Database populated successfully with users, ads, and reviews!'))
  .catch(console.error)
  .finally(() => db.disconnect())

// Funciones auxiliares
const getRandomElements = (array, count) => {
  if (array.length === 0) return []
  const shuffled = array.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(count, array.length))
}

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
