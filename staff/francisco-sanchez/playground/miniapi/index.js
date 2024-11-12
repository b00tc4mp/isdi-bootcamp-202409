import express, { json } from 'express'

const server = express()

const jsonBodyParser = express.json()

server.get('/', (_req, res) => res.send('Hello, my name is API and I am awake'))

server.use(express.static('public'))

server.post('/sayhello', jsonBodyParser, (req, res) => {
    const { nameUser, surnameUser } = req.body
    console.log("Alguien entra en el sayhello")


    try {
        const name = `${nameUser} ${surnameUser}`
        res.json({ message: `Hello, ${name}` })

    } catch (error) {
        res.status(400).json({ error: error.message })
        console.error(error)
    }
})


server.listen(8080, () => console.log('Api is running'))