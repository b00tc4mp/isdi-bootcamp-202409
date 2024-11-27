import 'dotenv/config'
import db, { User, Post } from './index.js'

db.connect(process.env.MONGO_URL)
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => Promise.all([
        User.create({
            name: "Juan Pérez",
            email: "juan.perez@example.com",
            username: "juanperez",
            password: "123123123",

        }),
        User.create({
            name: "María López",
            email: "maria.lopez@example.com",
            username: "marialopez",
            password: "secure456"
        }),
        User.create({
            name: "Luis Martínez",
            email: "luis.martinez@example.com",
            username: "luismartinez",
            password: "luis1234",

        })]))

    .then(([juan, maria, luis]) => Promise.all([
        Post.create({
            author: juan.id,
            image: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600",
            text: "Hemos perdido a nuestro Carlino llamado Lolo en carrer Sant Oleguer 12, Vilassar de mar, el 22.11.24. Es de color beige con hocico negro y su barriga tiene pelo más claro. Si lo ves, por favor contáctanos conmigo. Ofrecemos recompensa. ¡Gracias por tu ayuda!"
        }),
        Post.create({
            author: maria.id,
            image: "https://images.pexels.com/photos/208773/pexels-photo-208773.jpeg?auto=compress&cs=tinysrgb&w=600",
            text: "Hemos encontrado una gata blanca con ojos azules en Vilassar de Mar, cerca de la casa de la calle Aquitecto Eduard Ferres, 48. Parece perdida y es muy dócil. Si crees que es tuya o conoces a su dueño, por favor contáctanos conmigo. ¡Gracias!"
        }),
        Post.create({
            author: luis.id,
            image: "https://images.pexels.com/photos/1390784/pexels-photo-1390784.jpeg?auto=compress&cs=tinysrgb&w=600",
            text: "Hemos perdido a nuestro Caniche cerca del Ametller Origen, Vilassar de mar. Salimos y ya no estaba. Es marron, muy amigable, y llevaba un collar negro. Si alguien lo ha visto, por favor contáctenos. Ofrecemos recompensa. ¡Ayúdanos a encontrarlo!"
        })
    ]))
    .catch(console.error)
    .finally(() => db.disconnect())