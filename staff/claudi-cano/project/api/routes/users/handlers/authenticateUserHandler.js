import jwt from 'jsonwebtoken'
import logic from '../../../logic/index.js'
import { createFunctionHandler } from '../../helpers/index.js'

export default createFunctionHandler(async (req, res) => {
    const { username, password } = req.body

    const { id, role } = await logic.authenticateUser(username, password)

    const token = await jwt.sign({ sub: id, role }, process.env.JWT_SECRET, { expiresIn: '2h' })

    res.json(token)
})