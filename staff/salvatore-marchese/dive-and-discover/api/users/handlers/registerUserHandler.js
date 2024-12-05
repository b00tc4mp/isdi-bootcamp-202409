import logic from '../../logic/index.js'
import { createFunctionalHandler } from "../../helpers";

export default createFunctionalHandler(async (req, res) => {
    const { name, email, password, 'password-repeat': passwordRepeat } = req.body

    await logic.registerUser(name, email, password, passwordRepeat)

    res.status(201).send()
})