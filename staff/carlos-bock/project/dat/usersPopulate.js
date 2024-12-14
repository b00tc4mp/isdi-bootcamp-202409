import 'dotenv/config';

import fs from 'fs/promises';
import bcrypt from 'bcryptjs';

import db, { User } from './index.js';

db.connect('mongodb://localhost:27017/mired') // process.env.MONGO_URL  rocess.env.MONGO_URL_TEST
    //.then(() => Promise.all([User.deleteMany(), Recommend.deleteMany()]))
    .then(() => fs.readFile('./users.csv', 'utf-8'))
    .then(csv => {
        const lines = csv.split('\n');

        const creations = lines.map(line => {
            const [name, email, username, password, role] = line.split(',').map(item => item.trim())

            return User.create({ name, email, username, password: bcrypt.hashSync(password, 10), role })
        })

        return creations
    })
    .catch(console.error)
    .finally(() => db.disconnect())

