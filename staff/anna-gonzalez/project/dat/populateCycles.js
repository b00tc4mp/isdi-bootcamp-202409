import 'dotenv/config'

import fs from 'fs/promises'

import db, { Cycle } from './index.js'

db.connect(process.env.MONGO_URL)
    .then(() => Cycle.deleteMany())
    .then(() => fs.readFile('./cycles.csv', 'utf-8'))
    .then(csv => {
        const lines = csv.split('\n')

        const creations = lines.map(line => {
            const [user, start, end, periodEnd, dayLogs] = line.split(',').map(item => item.trim())

            return Cycle.create({ user, start, end, periodEnd, dayLogs })
        })

        return Promise.all(creations)
    })
    .catch(console.error)
    .finally(() => db.disconnect())