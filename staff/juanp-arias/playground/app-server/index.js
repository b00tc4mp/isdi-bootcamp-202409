import express from 'express'

let uuid = 0
const users = []

const server = express()

const formBodyParser = express.urlencoded({ extended: true })

server.use(express.static('public'))

server.post('/login', formBodyParser, (req, res) => {
    const { username, password } = req.body

    const user = users.find(user => user.username === username && user.password === password)

    if (!user) {
        res.send('wrong credentials')

        return
    }

    res.send(`welcome ${user.name}`)
})

server.post('/register', formBodyParser, (req, res) => {
    const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

    let user = users.find(user => user.email === email || user.username === username)

    if (user) {
        res.send('user already exists')

        return
    }
    if (user === '' || password === '') {
        res.send('please write something')
    }

    if (password !== passwordRepeat) {
        res.send('please write your fkn passwords right')

        return
    }
    user = { id: ++uuid, name, email, username, password }

    users.push(user)
    console.log(users)

    res.send('user registered')
})
server.listen(8080, () => console.log('server is up'))