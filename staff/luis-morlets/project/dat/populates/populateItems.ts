import 'dotenv/config'

import fs from 'fs/promises'

import db from '../index.js'
import { Item } from '../models/index.js'

db.connect(process.env.MONGO_URL_TEST!)
    .then(() => Promise.all([Item.deleteMany()]))
    .then(() => fs.readFile('./csv/items.csv', 'utf-8'))
    .then(csv => {
        const lines = csv.split('\n')

        const creations = lines.map(line => {
            const [name, description, quantity, buyPrice, sellPrice, type, effect] = line.split(',').map(item => item.trim())

            return Item.create({ name, description, quantity, buyPrice, sellPrice, type, effect })
        })

        return Promise.all(creations)
    })
    .catch(console.error)
    .then(() => console.log('populated'))
    .finally(() => db.disconnect())