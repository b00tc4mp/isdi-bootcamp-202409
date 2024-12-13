import 'dotenv/config'

import db from '../index.js'
import { User } from '../models/index.js'
import bcrypt from 'bcryptjs'

db.connect(process.env.ALLPIECE_URL_TEST!)
    .then(() => User.deleteMany())
    .then(() => Promise.all([
        User.create({
            email: 'javi@gmail.com',
            username: 'javi',
            password: bcrypt.hashSync('123123123', 10),
            score: 500
        }), User.create({
            email: 'javi2@gmail.com',
            username: 'javi2',
            password: bcrypt.hashSync('123123123', 10),
            score: 1250
        }), User.create({
            email: 'javi3@gmail.com',
            username: 'javi3',
            password: bcrypt.hashSync('123123123', 10),
            score: 1750
        }), User.create({
            email: 'javi4@gmail.com',
            username: 'javi4',
            password: bcrypt.hashSync('123123123', 10),
            score: 3000
        }), User.create({
            email: 'javi5@gmail.com',
            username: 'javi5',
            password: bcrypt.hashSync('123123123', 10),
            score: 5000
        }),
    ]))
    .catch(console.error)
    .then(() => console.log('populated regular users'))
    .finally(() => db.disconnect())