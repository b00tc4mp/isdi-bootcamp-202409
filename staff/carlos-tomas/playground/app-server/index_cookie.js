import express from 'express'
import cookieParser from 'cookie-parser'

var app = express()

app.use(cookieParser())


let uuid = 0
const users = []

const server = express()

const formBodyParser = express.urlencoded({ extended: true })

server.use(express.static('public'))

server.get('/cookie', (req, res) => {

    const userId = req.cookies.user.Id
    if (userId) {
        res.send(`User ID cookie is set with value: ${userId}`)
    } else {
        res.send('No User ID cookie found')

    }
})


server.post('/login', formBodyParser, (req, res) => {
    const { username, password } = req.body

    const user = users.find(user => user.username === username && user.password === password)

    if (!user) {
        res.send('wrong credentials')

        return
    }
    res.cookie('userId', user.id, { httpOnly: true, maxAge: 900000 })

    res.send(`welcome ${user.name}`)
})

server.post('/register', formBodyParser, (req, res) => {
    const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

    let user = users.find(user => user.email === email || user.username === username)

    if (user) {
        res.send('user already exists')

        return
    }

    if (password !== passwordRepeat) {
        res.send('passwords do not match')

        return
    }

    user = { id: ++uuid, name, email, username, password }

    users.push(user)
    console.log(users)


    res.cookie('userId', user.id, { httpOnly: true, maxAge: 900000 })
    res.send('user registered')
})

server.listen(8080, () => console.log('server is up'))