import express from 'express'
import 'dotenv/config'

const server = express()

server.get('/', (req, res) => res.send('Hello, API!'))
server.post('/login', (req, res) => res.json({mensaje:"ruta post:login"}))
server.post('/register', (req, res) => res.json({mensaje:"ruta post:register"}))
server.get('/products', (req, res) => res.json({mensaje:"ruta get:products"}))
server.get('/products/:id', (req, res) => res.json({mensaje:"ruta get:product/"+req.params.id}))


server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))