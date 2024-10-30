import express from 'express'

const server = express()

server.use(express.static('public'))

server.get('/hello', (req, res) => { // http://localhost:8080/hello?to=Pepito -> Hello, Pepito!
    const { to } = req.query

    res.send(`hello ${to}`)
})

server.get('/login', (req, res) => { // http://localhost:8080/login?username=pepito&password=123123123
    const { username, password } = req.query

    if ((username === 'peterpan' || username === 'wendydarling') && password === '123123123') {
        res.send(`welcome ${username}`)

        return
    }

    res.send('wrong credentials')
})


server.listen(8080, () => console.log('server is up'))