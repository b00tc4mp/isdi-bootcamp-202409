import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { name, nickname, password, 'password-repeat': passwordRepeat } = req.body

    await logic.registerUser(name, nickname, password, passwordRepeat)

    res.status(201).send()
})