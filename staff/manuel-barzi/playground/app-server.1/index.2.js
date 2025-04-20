import express from 'express'

// data

let uuid = 0
const users = []

// presentation + business (logic)

const server = express()

const formBodyParser = express.urlencoded({ extended: true })

server.use(express.static('public'))

server.post('/login', formBodyParser, (req, res) => { // http://localhost:8080/login [username=pepito&password=123123123]
    const { username, password } = req.body

    const user = users.find(user => user.username === username && user.password === password)

    if (!user) {
        res.send('wrong credentials')

        return
    }

    res.send(`welcome ${user.name}`)
})

server.post('/register', formBodyParser, (req, res) => { // http://localhost:8080/register [name=Peter+Pan&email=peter%40pan.com&username=peterpan&password=123123123&password-repeat=123123123]
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

    res.send('user registered')
})

server.listen(8080, () => console.log('server is up'))

// TODO use cookies for session management (RTFM cookies + express)