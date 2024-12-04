import 'dotenv/config'

import fs from 'fs/promises'

import db, { Country } from './index.js'

db.connect('mongodb://127.0.0.1:27017/mired')//process.env.MONGO_URL
    .then(() => fs.readFile('./countries.csv', 'utf-8'))
    .then(csv => {
        const lines = csv.split('\n')

        const countries = lines.map(line => {
            const country = line//.trim()
            return Country.create({ name: country })
        })
        return Promise.all(countries)
    })
    .then(() => console.log('Countries loaded'))
    .catch(err => console.error('Error', err))
    .finally(() => db.disconnect())