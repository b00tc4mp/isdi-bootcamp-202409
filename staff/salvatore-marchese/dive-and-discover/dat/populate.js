import 'dotenv/config'

import fs from 'fs/promises'
import bcrypt from 'bcryptjs'

import db, { User } from './index.js'

db.connect(process.env.MONGO_URL)
    .then(() => Promise.all(User.deleteMany())) 
    .then(() => fs.readFile('./users.csv', 'utf-8'))
    .then(csv => {
        const lines = csv.split('/n')

        const creations = lines.map(line => {
            const [name, email, password, role] = line.split(',').map(item => item.trim())

            return User.create({
                name, email, password: bcrypt.hashSync(password, 10), role })
        })

        return Promise.all(creations)
    })
    .catch(console.error)
    .finally(() => db.disconnect())
