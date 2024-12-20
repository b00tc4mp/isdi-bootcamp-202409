import jwt from 'jsonwebtoken'
import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { email, password } = req.body

    const id = await logic.authenticateUser(email, password)

    const token = await jwt.sign({ sub: id }, process.env.JWT_SECRET, { expiresIn: '50d' })

    res.json(token)
})