import 'dotenv/config';
import fs from 'fs/promises';
import bcrypt from 'bcryptjs';

import db, { User, Note } from './index.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => Promise.all([User.deleteMany(), Note.deleteMany()]))
    .then(() => fs.readFile('./users.csv', 'utf-8'))
    .then(csv => {
        const lines = csv.split('\n');

        const creations = lines.map(line => {
            const [name, email, password, dateOfBirth, role] = line.split(',').map(item => item.trim());

            return User.create({ name, email, password: bcrypt.hashSync(password, 10), dateOfBirth, role });
        });
        return Promise.all(creations);
    })
    .then(users => {
        return fs.readFile('./notes.csv', 'utf-8')
            .then(csv => {
                const lines = csv.split('\n');

                const creations = lines.map(async line => {
                    const [namefind, date, text] = line.split(',').map(item => item.trim());

                    const user = users.find(user => user.name === namefind);

                    if (!user) {
                        throw new Error(`User ${namefind} not found`);
                    }

                    const note = await Note.create({ author: user._id, date, text });

                    // Update user's notes array
                    await User.findByIdAndUpdate(user._id, { $push: { notes: note._id } });

                    return note;
                });

                return Promise.all(creations);
            });
    })
    .catch(console.error)
    .finally(() => db.disconnect());
