import express from 'express'

let uuid = 0
const users = []

//presentation + business (logic)

const server = express()

const formBodyParser = express.urlencoded({ extended: true })

server.use(express.static('public'))

server.post('/login', formBodyParser, (req, res) => {
    const { username, password } = req.body

    const user = users.find(user => user.username === username && user.password === password)

    if (!user) {
        res.send('wrong crendetials!!! ')
        return
    }
    res.send(`welcome ${user.name}`)
})

server.post('/register', formBodyParser, (req, res) => {
    const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

    let user = users.find(user => user.email === email || user.username === username)

    if (user) {
        res.send('mi arma! User already exist')

        return
    }

    if (password !== passwordRepeat) {
        res.send('Eiiiii! Cuidado!!! Las passwords no coinciden ☹️')
        return
    }

    user = { id: ++uuid, name, email, username, password }

    users.push(user)
    console.log(user)

    res.send('💚 ooooouyeeeeeaaaa! User has been registred!')
})

server.listen(8080, () => console.log('server is running forest!'))
