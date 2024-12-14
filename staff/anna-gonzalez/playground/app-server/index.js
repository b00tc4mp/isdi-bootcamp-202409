import express from 'express'

//data

let uuid = 0
const users = []

//presentation + business (logic)

const server = express()

const formBodyParser = express.urlencoded({ extended: true })
/*
coge la info del body y la parsea a json, osea la vuelve javascript
hay métodos: get, delete, put, patch... hoy hemos visto post y get
las de post tienen un body
*/

server.use(express.static('public')) //aki pasarán cositasss :P concretamente en la folder public

server.post('/login', formBodyParser, (req, res) => {
    /*
    request y response son objects y dentro tienen la propiedad body
    end-point: mezcla d método + una ruta
    fromBodyParser nunca lo veremos en una petición de tipo get
    post se usa para enviar datos al servidor, es decir, q reciba datos del cliente
    */
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

    user = { id: ++uuid, name, email, username, password }

    users.push(user)
    console.log(users)

    res.send('User registered')
})

server.listen(8080, () => console.log('Server is up'))