import "dotenv/config"

import fs from "fs/promises"
import bcrypt from "bcryptjs"

import db, { User, Event } from "./index.js"

db.connect(process.env.MONGO_URL_TEST)
  .then(() => Promise.all([User.deleteMany(), Event.deleteMany()]))
  .then(() => fs.readFile("./users.csv", "utf-8"))
  .then((csv) => {
    const lines = csv.split("\n")
    //console.log(lines)

    const creations = lines.map((line) => {
      const [name, email, password, role, permission] = line
        .split(";")
        .map((item) => item.trim())

      return User.create({
        name,
        email,
        password,
        role,
        permission,
      })
    })
    return Promise.all(creations)
  })
  .then((users) => {
    return fs.readFile("./events.csv", "utf-8").then((csv) => {
      const lines = csv.split("\n")

      const creations = lines.map((line) => {
        const [email, type, images, text, date, lat, lon, address, province] =
          line.split(";").map((item) => item.trim())

        const { _id: author } = users.find((user) => user.email === email)

        const filetoB64Conversions = Array.prototype.map.call(images, toBase64)

        const locationFormatted = {
          coordinates: [lat, lon],
          address,
          province,
        }

        const likes = []
        const likesNumber = randomNumber(0, users.length)

        for (let i = 0; i < likesNumber; i++) {
          let user = randomElement(users)

          while (likes.includes(user.id)) user = randomElement(users)

          likes.push(user.id)
        }

        Promise.all(filetoB64Conversions).then((images) => {
          return Event.create({
            author,
            type,
            images,
            text,
            date,
            locationFormatted,
            likes,
          })
        })
      })

      return Promise.all(creations)
    })
  })
  .catch(console.error)
  .finally(() => db.disconnect())

const randomElement = (array) => array[Math.floor(Math.random() * array.length)]
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })
