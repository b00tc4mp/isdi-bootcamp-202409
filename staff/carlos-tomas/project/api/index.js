import 'dotenv/config'
import db from 'dat'
import express, { json } from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import logic from './logic/index.js'

import { createFunctionalHandler, authorizationHandler, errorHandler } from './helpers/index.js'

db.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to db')

    const server = express()

    server.use(cors())

    const jsonBodyParser = json()

    server.get('/', (_, res) => res.send('Hello, API!'))

    server.post('/users/auth', jsonBodyParser, createFunctionalHandler(async (req, res) => {
        const { username, password } = req.body

        const { id, role } = await logic.authenticateUser(username, password)

        const token = jwt.sign({ sub: id, role }, process.env.JWT_SECRET, { expiresIn: '5d' })

        res.json({ token })
    }))

    server.post('/usersRegister', jsonBodyParser, createFunctionalHandler(async (req, res) => {
        const { name, username, password, phone, email, passwordRepeat } = req.body

        await logic.registerUser(name, username, password, phone, email, passwordRepeat)

        res.status(201).send()
    }))

    server.get('/users', authorizationHandler, createFunctionalHandler(async (req, res) => {
        const { userId } = req

        const user = await logic.getUser(userId)

        res.json(user)
    }))

    server.get('/pets', authorizationHandler, createFunctionalHandler(async (req, res) => {
        const { userId } = req
        const pets = await logic.getPets(userId)

        res.json(pets)
    }))

    server.get('/pets/history/:type/:petId', authorizationHandler, jsonBodyParser, createFunctionalHandler(async (req, res) => {
        const { userId, params: { type, petId } } = req

        const histories = await logic.getHistoriesPets(userId, type, petId)

        res.json(histories)
    }))

    server.post('/veterinary/registerPet', authorizationHandler, jsonBodyParser, createFunctionalHandler(async (req, res) => {
        const { userId } = req
        const { chip, name, race, sex, weight, sterilized, dateOfBirth } = req.body

        await logic.registerPet(userId, chip, name, race, sex, weight, sterilized, dateOfBirth)

        res.status(201).send()
    }))

    server.post('/veterinary/registerHistory', authorizationHandler, jsonBodyParser, createFunctionalHandler(async (req, res) => {
        const { userId } = req
        const { petId, type, text } = req.body

        await logic.registerHistory(userId, petId, type, text)

        res.status(201).send()
    }))

    server.patch('/veterinary/updatePet', authorizationHandler, jsonBodyParser, createFunctionalHandler(async (req, res) => {
        const { userId } = req
        const { petId, vaccine, deworn } = req.body

        await logic.updateVaccinesDewornsPet(userId, petId, vaccine, deworn)

        res.status(201).send()
    }))

    server.use(errorHandler)

    server.listen(process.env.PORT, process.env.URL_API, () => console.log('API listening on /192.168.1.107:8080'))
})