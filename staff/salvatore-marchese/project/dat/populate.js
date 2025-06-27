import 'dotenv/config'

import fs from 'fs/promises'
import bcrypt from 'bcryptjs'

import db, { User } from './index.js'

db.connect(process.env.MONGO_URL)
    .then(() => User.deleteMany()) 
    .then(() => fs.readFile('./users.csv', 'utf-8'))
    .then(csv => {
        const lines = csv.split('\n').filter(line => line.trim())

        const creations = lines.map(line => {
            const [name, email, password, role] = line.split(',').map(item => item.trim())

            return User.create({
                name, email, password: bcrypt.hashSync(password, 10), role })
        })

        return Promise.all(creations)
    })
    .then(() => {
        console.log('User population complete!')
    })
    .catch(console.error)
    .finally(() => db.disconnect())
