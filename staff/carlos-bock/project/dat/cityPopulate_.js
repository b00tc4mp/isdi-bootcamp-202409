import 'dotenv/config'

import fs from 'fs/promises'

import db, { City } from './index.js'

db.connect('mongodb://127.0.0.1:27017/mired')//process.env.MONGO_URL
    .then(() => fs.readFile('./countries.csv', 'utf-8'))
    .then(csv => {
        const lines = csv.split('\n')

        const creations = lines.map(line => {
            const [city, country] = line.split(',').map(item => item.trim())
            return City.create({ city, country })
        })
        return Promise.all(creations)
    })
    .then(() => console.log('Countries loaded'))
    .catch(err => console.error('Error', err))
    .finally(() => db.disconnect())