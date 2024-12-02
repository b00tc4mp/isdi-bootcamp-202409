import 'dotenv/config'

import fs from 'fs/promises'

import db, { DayLog } from './index.js'

db.connect(process.env.MONGO_URL)
    .then(() => DayLog.deleteMany())
    .then(() => fs.readFile('./daylogs.csv', 'utf-8'))
    .then(csv => {
        const lines = csv.split('\n')

        const creations = lines.map(line => {
            const [date, symptoms, mood, energy, flow, sleep, sexualActivity, sexualEnergy] = line.split(',').map(item => item.trim())

            return DayLog.create({ date, symptoms, mood, energy, flow, sleep, sexualActivity, sexualEnergy })
        })

        return Promise.all(creations)
    })
    .catch(console.error)
    .finally(() => db.disconnect())