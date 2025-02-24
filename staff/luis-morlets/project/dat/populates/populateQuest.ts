import 'dotenv/config'

import db from '../index.js'
import { Quest } from '../models/index.js'

db.connect(process.env.MONGO_URL!)
    .then(() => Quest.deleteMany())
    .then(() => Promise.all([Quest.create({
        name: 'The Cursed Kingdom',
        description: 'The king of Ealdoria gives the party an explanation about the curse upon the kigndom',
        isCompleted: false,
        parent: null
    })]))
    .then(([firstQuest]) => Promise.all([
        Quest.create({
            name: 'The Poisoned Swamp',
            description: 'Travel trough the poisoned swamp to stop the curse',
            isCompleted: false,
            parent: firstQuest.id
        })
    ]))
    .then(([secondQuest]) => Promise.all([
        Quest.create({
            name: 'The Infected Mountains',
            description: 'Face the horrendous creatures that inhabit on the infected mountains',
            isCompleted: false,
            parent: secondQuest.id
        }),
        Quest.create({
            name: 'The Gloomy Cave',
            description: 'Eplore the gloomy cave to find any clues about Umbra\'khan',
            isCompleted: false,
            parent: secondQuest.id
        })
    ]))
    .then(([thirdQuest1, thirdQuest2]) => Promise.all([
        Quest.create({
            name: 'The Forgotten Temple',
            description: 'Get into the temple to fight against Umbra\'khan',
            isCompleted: false,
            parent: thirdQuest1.id
        }),
        Quest.create({
            name: 'The Forgotten Temple',
            description: 'Get into the temple to fight against Umbra\'khan',
            isCompleted: false,
            parent: thirdQuest2.id
        })
    ]))
    .catch(console.error)
    .then(() => console.log('populated'))
    .finally(() => db.disconnect())