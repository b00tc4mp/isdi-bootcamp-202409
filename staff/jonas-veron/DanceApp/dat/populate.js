import "dotenv/config"
import fs from "fs/promises"
import bcrypt from "bcryptjs"
import db, { User, Event } from "./index.js"

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    console.log("Conectado a MongoDB")
    return Promise.all([User.deleteMany(), Event.deleteMany()]) // Limpia las colecciones
  })
  .then(() => fs.readFile("./users.csv", "utf-8"))
  .then((csv) => {
    const lines = csv.split("\n").filter((line) => line.trim()) // Filtra líneas vacías
    const userCreations = lines.map((line, index) => {
      const fields = line.split(",").map((item) => item.trim())

      if (fields.length !== 7) {
        console.error(`Línea inválida en users.csv (índice ${index}):`, line)
        return null
      }

      const [name, email, password, role, permission, isApproved, city] = fields

      return User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role,
        permission,
        isApproved: isApproved === "true",
        city,
      })
    })

    return Promise.all(userCreations.filter(Boolean))
  })
  .then((users) => {
    console.log("Usuarios creados:", users.length)

    return fs.readFile("./events.csv", "utf-8").then((csv) => {
      const lines = csv.split("\n").filter((line) => line.trim()) // Filtra líneas vacías
      const eventCreations = lines.map((line, index) => {
        const fields = line.split(/,(?![^\[]*\])/).map((item) => item.trim())
        // El regex separa por comas, pero ignora las comas dentro de corchetes

        if (fields.length !== 6) {
          console.error(`Línea inválida en events.csv (índice ${index}):`, line)
          return null
        }

        const [email, image, text, eventDate, address, coordinates] = fields

        const author = users.find((user) => user.email === email)?._id

        if (!author) {
          console.error(
            `No se encontró un autor para el evento (índice ${index}):`,
            line
          )
          return null
        }

        const coords = coordinates
          .replace("[", "")
          .replace("]", "")
          .split(",")
          .map((coord) => parseFloat(coord.trim()))

        if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) {
          console.error(
            `Coordenadas inválidas en línea (índice ${index}):`,
            line
          )
          return null
        }

        return Event.create({
          author,
          image: image.startsWith("http")
            ? image
            : `http://localhost:3000/${image}`,
          text,
          eventDate,
          location: {
            type: "Point",
            coordinates: coords,
            address,
          },
          likes: [],
          comments: [],
        })
      })

      return Promise.all(eventCreations.filter(Boolean))
    })
  })
  .then((events) => {
    console.log("Eventos creados:", events.length)
  })
  .catch((error) => {
    console.error("Error durante el proceso de populado:", error.message)
  })
  .finally(() => db.disconnect())
