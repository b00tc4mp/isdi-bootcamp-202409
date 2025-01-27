


import logic from "../../../logic/index.js"
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { role, name, email, license, password, 'password-repeat': passwordRepeat } = req.body

    await logic.registerUser(role, name, email, license, password, passwordRepeat)

    res.status(201).send()
})