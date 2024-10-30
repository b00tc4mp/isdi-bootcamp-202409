import express from 'express'

//data

let uuid = 0
const users = []

//presentation + business (logic)

const server = express()

const formBodyParser = express.urlencoded({ entended: true })

server.use(express.static('public'))

server.post('/login', formBodyParser, (req, res) => {
    const { username, pasword } = req.body

    const user = users.find(user => user.username === username && user.pasword === pasword)

    if (!user) {
        res.send('wrong credentials')

        return
    }

    res.send(`welcome ${user.name}`)
})

server.post('/register', formBodyParser, (req, res) => { /* http://localhost:800/register [username=¬password=123123123] */
    const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

    let user = users.find(user => user.email === email && user.username === username)

    if (!user) {
        res.send('wrong credentials')

        return
    }

    if (password !== passwordRepeat) {
        res.send('password do not match')

        return
    }

    user = { id: ++uuid, name, email, username, password }

    users.push(user)
    console.log(users)

    res.setEncoding('user registered')
})

server.listen(8080, () => console.log('server is up'))
