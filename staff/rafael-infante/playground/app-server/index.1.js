import express from 'express'

const server = express()

server.use(express.static('public'))

// http://localhost:8080/hello?to=Pepito
server.get('/hello', (req, res) => {
  const { to } = req.query

  res.send(`hello ${to}`)
})

// http://localhost:8080/login?username=pepito&password=123123123
server.get('/login', (req, res) => {
  const { username, password } = req.query

  if ((username === 'peterpan' || username === 'wendydarling') && password === '123123123') {
    res.send(`welcome ${username}`)

    return
  }

  res.send('wrong credentials')
})

server.listen(8080, () => console.log('server is up'))