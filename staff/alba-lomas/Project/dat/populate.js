


import 'dotenv/config';
import fs from 'fs/promises';
import bcrypt from 'bcryptjs';
import db, { User, Expense } from './index.js';

db.connect(process.env.MONGO_URL)
    .then(() => Promise.all([User.deleteMany(), Expense.deleteMany()]))
    .then(() => fs.readFile('./users.csv', 'utf-8'))
    .then(csv => {
        const lines = csv.split('\n');

        const creations = lines.map(line => {
            const [role, name, email, license, password, date] = line.split(',').map(item => item.trim());

            return User.create({
                role,
                name,
                email,
                password: bcrypt.hashSync(password, 10),
                license,
                date: new Date(date)
            });
        });

        return Promise.all(creations);
    })
    .then(users => {
        return fs.readFile('./expenses.csv', 'utf-8')
            .then(csv => {
                const lines = csv.split('\n');

                const creations = lines.map(async line => {
                    const [namefind, amount, type, provider, date] = line.split(',').map(item => item.trim());

                    const user = users.find(user => user.name === namefind); // Encontrar al usuario por su nombre

                    if (!user) {
                        throw new Error(`User ${namefind} not found`);
                    }

                    const expense = await Expense.create({
                        author: user._id,
                        amount,
                        type,
                        provider,
                        date: new Date(date)
                    });

                    await User.findByIdAndUpdate(user._id, { $push: { expenses: expense._id } });

                    return expense;
                });

                return Promise.all(creations);
            });
    })
    .catch(console.error)
    .finally(() => db.disconnect());

const randomElement = array => array[Math.floor(Math.random() * array.length)];
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;
