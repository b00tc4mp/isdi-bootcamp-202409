import 'dotenv/config'

import db from '../index.js'
import { User } from '../models/index.js'
import bcrypt from 'bcryptjs'

db.connect(process.env.ALLPIECE_URL!)
    .then(() => Promise.all([
        User.create({
            email: 'anonymous1@gmail.com',
            username: 'anonymous1',
            password: bcrypt.hashSync('anonymous1', 10),
            role: 'anonymous'
        }), User.create({
            email: 'anonymous2@gmail.com',
            username: 'anonymous2',
            password: bcrypt.hashSync('anonymous2', 10),
            role: 'anonymous'
        }), User.create({
            email: 'anonymous3@gmail.com',
            username: 'anonymous3',
            password: bcrypt.hashSync('anonymous3', 10),
            role: 'anonymous'
        }), User.create({
            email: 'anonymous4@gmail.com',
            username: 'anonymous4',
            password: bcrypt.hashSync('anonymous4', 10),
            role: 'anonymous'
        }), User.create({
            email: 'anonymous5@gmail.com',
            username: 'anonymous5',
            password: bcrypt.hashSync('anonymous5', 10),
            role: 'anonymous'
        }),
    ]))
    .catch(console.error)
    .then(() => console.log('populated anonymous users'))
    .finally(() => db.disconnect())