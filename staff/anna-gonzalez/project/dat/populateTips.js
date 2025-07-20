import 'dotenv/config'

import fs from 'fs/promises'

import db, { Tip } from './index.js'

db.connect(process.env.MONGO_URL)
    .then(() => Tip.deleteMany())
    .then(() => fs.readFile('./tips.csv', 'utf-8'))
    .then(csv => {
        const lines = csv.split('\n')

        const creations = lines.map(line => {
            const [date, phase, category, description] = line.split(',').map(item => item.trim())

            return Tip.create({ date, phase, category, description })
        })

        return Promise.all(creations)
    })
    .catch(console.error)
    .finally(() => db.disconnect())