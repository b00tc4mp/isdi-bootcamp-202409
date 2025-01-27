


import 'dotenv/config';
import db, { User, Expense } from './index.js';
import bcrypt from 'bcryptjs'; 

db.connect(process.env.MONGO_URL)
    .then(() => Promise.all([User.deleteMany(), Expense.deleteMany()])) 
    .then(() => Promise.all([
        User.create({
            role: 'restaurant',
            name: 'Alba',
            email: 'alba@lomas.com',
            license: '46718412-F',
            password: bcrypt.hashSync('123123123', 10), 
            date: '2024-12-01' 
        }),
        User.create({
            role: 'employee',
            name: 'Laura',
            email: 'laura@cervera.com',
            license: '46763412-F',
            password: bcrypt.hashSync('123123123', 10), 
            date: '2024-12-02' 
        })
    ]))
    .then(([alba, laura]) => Promise.all([
        Expense.create({
            author: alba.id,
            amount: 470.50,
            type: 'carne',
            provider: 'carnia',
            date: '2024-12-01' 
        }),
        Expense.create({
            author: laura.id,
            amount: 270.90,
            type: 'verduras',
            provider: 'colofruit',
            date: '2024-12-02' 
        })
    ]))
    .catch(console.error)
    .finally(() => db.disconnect());
