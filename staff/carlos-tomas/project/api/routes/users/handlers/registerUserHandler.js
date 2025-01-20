import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'


export default createFunctionalHandler(async (req, res) => {
    const { name, username, password, phone, email, passwordRepeat } = req.body

    await logic.registerUser(name, username, password, phone, email, passwordRepeat)

    res.status(201).send()

})