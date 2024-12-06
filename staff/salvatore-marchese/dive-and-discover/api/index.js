import 'dotenv/config'
import db from '../dat/index.js'
import express, { json } from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'


import logic from './logic/index.js' 
import { createFunctionalHandler, authorizationHandler, errorHandler } from './helpers/index.js'

db.connect(process.env.MONGO_URL_TEST).then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())

    const jsonBodyParser = json()

    server.get('/', (_, res) => res.send('API connected!'))

    server.post('/users/auth', jsonBodyParser, createFunctionalHandler(async (req, res) => {
        const { email, password } = req.body

        return logic.authenticateUser(email, password)
            .then(({ id, role }) => jwt.sign({ sub: id, role }, process.env.JWT_SECRET, {expiresIn: '1h' }))
            .then(token => res.json({token}))
    }))

    server.post('/home-diver', jsonBodyParser, createFunctionalHandler(async (req, res) => {
        const { name, email, password, 'password-repeat': passwordRepeat } = req.body

        // Ensure that passwords match before calling the register logic
        if (password !== passwordRepeat) {
            return res.status(400).send('Passwords do not match');
        }

        await logic.registerUserDiver(name, email, password, passwordRepeat).then(() => res.status(201).send())
    }))

    server.get('/users/:targetUserId/name', authorizationHandler, createFunctionalHandler((req, res) => {
        const { userId, params: {
        targetUserId } } = req

        return logic.getUserName(userId, targetUserId).then(name => res.json({name}))
    }))

    server.get('/diver/profile', authorizationHandler, async (req, res) => {
        const { sub } = req.user; // Extracted from the verified JWT token
        const user = await logic.getUserById(sub);
        res.json(user);
    })

    //editing profile page 
    server.get('/user/:id', authorizationHandler, async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            if (!user) return res.status(404).json({ message: 'User not found' })
            
                res.json(user)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })
    
    server.put('/user/:id', authorizationHandler, async (req, res) => {
        try {
            const { name, email, password} = req.body
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, password}, { new: true })
    
            if (!updatedUser) return res.status(404).json({ message: 'User not found!'})
    
            res.json(updatedUser)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})

