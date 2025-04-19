import express from 'express'
import logic from './logic/index.js'


const server = express()

const formBodyParser = express.urlencoded({ extended: true })

server.use(express.static('public'))

server.post('/login', formBodyParser, (req, res) => {
    
    const { username, password } = req.body

   try {
        const user = logic.authenticateUser(username, password)

        res.send(`welcome ${user.name}`)
    } catch (error) {
        res.send(error.message)

        console.error(error)
    }
})

server.post('/register', formBodyParser, (req, res) => { // 
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