import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { name, email, dateOfBirth, password, 'password-repeat': passwordRepeat } = req.body

    await logic.registerUser(name, email, dateOfBirth, password, passwordRepeat)

    res.status(201).send()
})