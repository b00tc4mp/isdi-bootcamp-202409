import express from 'express'

//data

let uuid = 0
const users = []

//presentation + business(logic)

const server = express()

const formBodyParser = express.urlencoded({ extended: true })

server.post('/login', formBodyParser, (req, res) => {
    const { username, password } = req.body

    const user = users.find(user => user.username === username && user.password === password)

    if (!user) {
        res.send('Wrong credentials')

        return
    }

    res.send(`Welcome ${user.name}`)
})

server.post('/register', formBodyParser, (req, res) => {
    const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

    let user = users.find(user => user.email === email || user.username === username)

    if (user) {
        res.send('User already exists')

        return
    }

    if (password !== passwordRepeat) {
        res.send('Passwords do not match')

        return
    }

    user = { id: ++uuid, name, email, username, password } //el ++ delante incrementa primero y luego asigna (osea empieza en el 1); detrás, en cambio, se asigna el valor y luego se incrementa

    users.push(user)
    console.log(users)

    res.send('User registered')
})

server.listen(8080, () => console.log('Server is up'))

