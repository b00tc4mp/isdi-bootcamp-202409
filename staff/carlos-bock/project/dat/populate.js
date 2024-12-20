import 'dotenv/config'
import fs from 'fs/promises'
import bcrypt from 'bcryptjs'

import db, { User, Recommend } from './index.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => Promise.all([User.deleteMany(), Recommend.deleteMany()]))
    .then(() => fs.readFile('./users.csv', 'utf-8'))
    .then(csv => {
        const lines = csv.split('\n')

        const userCreations = lines.map(line => {
            const [name, email, username, _password, role] = line.split(',').map(item => item.trim())
            //console.log(password)
            return User.create({
                name: name,
                email: email,
                username: username,
                password: bcrypt.hashSync('_password', 10),
                role: role
            })
        })

        return Promise.all(userCreations)
    })
    .then(users => {
        return fs.readFile('./recommends.csv', 'utf-8')
            .then(csv => {
                const lines = csv.split('\n')

                const recommmendations = lines.map(line => {
                    const [
                        username,
                        city,
                        country,
                        category,
                        price,
                        link,
                        image,
                        recommendText,
                        subject
                    ] = line.split(',').map(item => item.trim())

                    const { _id: author } = users.find(user => user.username === username)

                    return Recommend.create({
                        author,
                        city,
                        country,
                        category: parseInt(category, 10),
                        price: parseInt(price, 10),
                        link,
                        image,
                        text: recommendText,
                        subject
                    })
                })

                return Promise.all(recommmendations)
            })
    })
    .catch(console.error)
    .finally(() => db.disconnect())
