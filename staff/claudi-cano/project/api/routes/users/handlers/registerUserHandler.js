import logic from '../../../logic/index.js'
import { createFunctionalhandler } from '../../helpers/index.js'

export default createFunctionalhandler(async (req, res) => {
    const { name, email, username, password, 'password-repeat': passwordRepeat } = req.body

    await logic.registerUser(name, email, username, password, passwordRepeat)

    res.status(201).send()
})