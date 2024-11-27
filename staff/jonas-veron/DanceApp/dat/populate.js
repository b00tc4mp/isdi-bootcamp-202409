import "dotenv/config"

import fs from "fs/promises"
import bcrypt from "bcryptjs"

import db, { User, Event } from "./index.js"

db.connect(process.env.MONGO_URL_TEST)
  .then(() => Promise.all([User.deleteMany(), Event.deleteMany()]))
  .then(() => fs.readFile("./users.csv", "utf-8"))
  .then((csv) => {
    const lines = csv.split("\n")
    // console.log(lines)

    const creations = lines.map((line) => {
      const [name, email, password, role] = line
        .split(",")
        .map((item) => item.trim())
      // console.log(name, email, password, role)

      if (!name || !email || !password || !role) {
        throw new Error(`Datos faltantes en línea: ${line}`)
      }

      return User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role,
      })
    })

    return Promise.all(creations)
  })
  .then((users) => {
    return fs.readFile("./events.csv", "utf-8").then((csv) => {
      const lines = csv.split("\n")

      const creations = lines.map((line) => {
        const [email, image, text, date] = line
          .split(",")
          .map((item) => item.trim())

        const { _id: author } = users.find((user) => user.email === email)

        const likes = []
        const likesNumber = randomNumber(0, users.length)

        for (let i = 0; i < likesNumber; i++) {
          let user = randomElement(users)

          while (likes.includes(user.id)) user = randomElement(users)

          likes.push(user.id)
        }

        return Event.create({ author, image, text, date, likes })
      })

      return Promise.all(creations)
    })
  })
  .catch(console.error)
  .finally(() => db.disconnect())

const randomElement = (array) => array[Math.floor(Math.random() * array.length)]
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min
