import 'dotenv/config'

import fs from 'fs/promises'
import bcrypt from 'bcryptjs'

import db from '../index.js'
import { Player } from '../models/index.js'

db.connect(process.env.MONGO_URL_TEST!)
    .then(() => Promise.all([Player.deleteMany()]))
    .then(() => fs.readFile('./csv/players.csv', 'utf-8'))
    .then(csv => {
        const lines = csv.split('\n')

        const creations = lines.map(line => {
            const [name, email, username, password] = line.split(',').map(item => item.trim())

            return Player.create({ name, email, username, password: bcrypt.hashSync(password, 10) })
        })

        return Promise.all(creations)
    })
    .catch(console.error)
    .then(() => console.log('populated'))
    .finally(() => db.disconnect())
