import 'dotenv/config'
import db, { User, Post, Report } from './index.js'
import bcrypt from 'bcryptjs'

db.connect(process.env.MONGO_URL)
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany(), Report.deleteMany()]))
    .then(async () => Promise.all([
        User.create({
            name: "Juan Pérez",
            email: "juan.perez@example.com",
            password: await bcrypt.hash("123123123", 10),
            phone: "684734576"

        }),
        User.create({
            name: "María López",
            email: "maria.lopez@example.com",
            password: await bcrypt.hash("secure456", 10),
            phone: "684734576"
        }),
        User.create({
            name: "Luis Martínez",
            email: "luis.martinez@example.com",
            password: await bcrypt.hash("luis1234", 10),
            phone: "684734576"

        })]))
    .then(([juan, maria, luis]) => Promise.all([
        maria,
        Post.create({
            author: juan.id,
            image: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600",
            text: "We have lost our Pug named Lolo on Sant Oleguer Street 12, Vilassar de Mar, on 11/22/24. He is beige with a black muzzle, and his belly has lighter fur. If you see him, please contact us. A reward is offered. Thank you for your help!",
            petType: 'dog',
            petGender: 'male',
            status: 'lost',
            whatHappened: 'lost'
        }),
        Post.create({
            author: maria.id,
            image: "https://images.pexels.com/photos/208773/pexels-photo-208773.jpeg?auto=compress&cs=tinysrgb&w=600",
            text: "We have found a white cat with blue eyes in Vilassar de Mar, near the house on Arquitecto Eduard Ferres Street, 48. She seems lost and is very gentle. If you think she is yours or know her owner, please contact us. Thank you!",
            petType: 'cat',
            petGender: 'female',
            status: 'lost',
            whatHappened: 'lost'
        }),
        Post.create({
            author: luis.id,
            image: "https://images.pexels.com/photos/1390784/pexels-photo-1390784.jpeg?auto=compress&cs=tinysrgb&w=600",
            text: "We have lost our Poodle near Ametller Origen, Vilassar de Mar. We went out, and he was gone. He is brown, very friendly, and was wearing a black collar. If anyone has seen him, please contact us. A reward is offered. Please help us find him!",
            petType: 'cat',
            petGender: 'male',
            status: 'lost',
            whatHappened: 'lost'
        }),
    ]))
    .then((([maria, post1]) => Promise.all([
        Report.create({
            type: 'post',
            reportedId: post1.author,
            reason: 'spam',
            details: 'The post seems to have unrelated content',
            reportedBy: maria.id
        })
    ])))
    .then(report => console.log('Reporte creado:', report))
    .catch(console.error)
    .finally(() => db.disconnect())