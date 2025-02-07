import jwt from 'jsonwebtoken'
import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { username, password } = req.body

    const { id, role } = await logic.authenticateUser(username, password)

    const token = await jwt.sign({ sub: id, role }, process.env.JWT_SECRET, { expiresIn: '4h' })

    res.json(token)
})