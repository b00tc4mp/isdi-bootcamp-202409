import 'dotenv/config'

import db from '../index.js'
import { Condition } from '../models/index.js'

db.connect(process.env.ALLPIECE_URL!)
    .then(() => Condition.deleteMany())
    .then(() => Promise.all([
        // COLUMN
        Condition.create({
            type: 'equal',
            property: 'affiliation',
            value: 'Straw Hat Pirates',
            direction: 'column',
            indexes: [],
            text: 'Straw Hat Pirates'
        }),
        Condition.create({
            type: 'equal',
            property: 'sea',
            value: 'East Blue',
            direction: 'column',
            indexes: [],
            text: 'From the East Blue'
        }),
        Condition.create({
            type: 'equal',
            property: 'affiliation',
            value: 'Marines',
            direction: 'column',
            indexes: [],
            text: 'Marine'
        }),
        Condition.create({
            type: 'equal',
            property: 'race',
            value: 'Human',
            direction: 'column',
            indexes: [],
            text: 'Human race'
        }),
        Condition.create({
            type: 'equal',
            property: 'sea',
            value: 'Grand Line',
            direction: 'column',
            indexes: [],
            text: 'From the Grand Line'
        }),
        Condition.create({
            type: 'equal',
            property: 'affiliation',
            value: 'Big Mom Pirates',
            direction: 'column',
            indexes: [],
            text: 'Big Mom Pirates'
        }),

        // ROW
        Condition.create({
            type: 'greater than equal',
            property: 'bounty',
            value: 100000000,
            direction: 'row',
            indexes: [],
            text: 'Bounty over 100M'
        }),
        Condition.create({
            type: 'lower than equal',
            property: 'bounty',
            value: 1500000000,
            direction: 'row',
            indexes: [],
            text: 'Bounty less than 1.5B'
        }),
        Condition.create({
            type: 'equal',
            property: 'conqueror',
            value: true,
            direction: 'row',
            indexes: [],
            text: 'Conqueror\'s haki'
        }),
        Condition.create({
            type: 'equal',
            property: 'conqueror',
            value: false,
            direction: 'row',
            indexes: [],
            text: 'Without conqueror\'s haki'
        }),
        Condition.create({
            type: 'lower than equal',
            property: 'height',
            value: 300,
            direction: 'row',
            indexes: [],
            text: 'Height lower than 3m'
        }),
        Condition.create({
            type: 'greater than equal',
            property: 'height',
            value: 200,
            direction: 'row',
            indexes: [],
            text: 'Height higher than 2m'
        })
    ]))
    .catch(console.error)
    .then(() => console.log('populated conditions'))
    .finally(() => db.disconnect())