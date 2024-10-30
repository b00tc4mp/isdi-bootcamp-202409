import express from 'express'
import logic from './logic/index.js'

const server = express()

const formBodyParser = express.urlencoded({ extended: true })

server.use(express.static('public'))

server.get('/login', (req, res) => {
    const userId = req.headers.cookie?.split('=')[1]

    if (userId) {
        res.redirect('/')

        return
    }

    res.send(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>

<body>
    <h1>Login</h1>

    <form action="/login" method="post">
        <label for="username">Username</label>
        <input type="text" name="username" id="username">

        <label for="password">Password</label>
        <input type="password" name="password" id="password">

        <button type="submit">Login</button>
    </form>
</body>

</html>`)
})

server.get('/', (req, res) => {
    const userId = req.headers.cookie?.split('=')[1]

    if (!userId) {
        res.redirect('/login')

        return
    }

    res.send(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>

<body>
    <h1>Home</h1>
</body>

</html>`)
})

server.post('/login', formBodyParser, (req, res) => {
    const { username, password } = req.body

    try {
        const userId = logic.authenticateUser(username, password)

        res.setHeader('set-cookie', `userId=${userId}`)

        res.redirect('/')
    } catch (error) {
        res.send(error.message)

        console.error(error)
    }
})

server.post('/register', formBodyParser, (req, res) => {
    const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

    try {
        logic.registerUser(name, email, username, password, passwordRepeat)

        res.send('user registered')
    } catch (error) {
        res.send(error.message)

        console.error(error)
    }
})

server.listen(8080, () => console.log('server is up'))

// TODO use cookies for session management (RTFM cookies + express)