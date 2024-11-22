import 'dotenv/config'

import fs from 'fs/promises'
import bcrypt from 'bcryptjs'

import db, { User, Post } from './index.js'

db.connect(process.env.MONGO_URL)
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => fs.readFile('./users.csv', 'utf-8'))
    .then(csv => {
        const lines = csv.split('\n')

        const creations = lines.map(line => {
            const [name, email, username, password, role] = line.split(',').map(item => item.trim())

            return User.create({ name, email, username, password: bcrypt.hashSync(password, 10), role })
        })

        return Promise.all(creations)
    })
    .then(users => {
        return fs.readFile('./posts.csv', 'utf-8')
            .then(csv => {
                const lines = csv.split('\n')

                const creations = lines.map(line => {
                    const [username, image, text, date] = line.split(',').map(item => item.trim())

                    const { _id: author } = users.find(user => user.username === username)

                    const likes = []
                    const likesNumber = randomNumber(0, users.length)

                    for (let i = 0; i < likesNumber; i++) {
                        let user = randomElement(users)

                        while (likes.includes(user.id))
                            user = randomElement(users)

                        likes.push(user.id)
                    }

                    return Post.create({ author, image, text, date, likes })
                })

                return Promise.all(creations)
            })
    })
    .catch(console.error)
    .finally(() => db.disconnect())

const randomElement = array => array[Math.floor(Math.random() * array.length)]
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min 