


import jwt from 'jsonwebtoken'
import logic from "../../../logic/index.js"
import { createFunctionalHandler } from "../../helpers/index.js"

export default createFunctionalHandler(async (req, res) => {
    const { name, password } = req.body

    const { id, role } = await logic.authenticateUser(name, password)

    const token = jwt.sign({ sub: id, role }, process.env.JWT_SECRET, { expiresIn: '4h' })

    return res.json(token)
})