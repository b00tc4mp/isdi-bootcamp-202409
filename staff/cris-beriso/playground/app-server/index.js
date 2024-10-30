import express from 'express'
import logic from './logic/index.js'

//presentation + bussines(logic)

const server = express()

const formBodyParser = express.urlencoded({ extended: true }) //Coge la info del body y la parsea a JSON para poder procesarla

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

  if (!user) {
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

server.post('/login', formBodyParser, (req, res) => { // http://localhost:8080/login [username=pepito&password=123123123]
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
// TODO falta editar el register
server.post('/register', formBodyParser, (req, res) => {
  const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

  let user = users.find(user => user.email || user.username === username)

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