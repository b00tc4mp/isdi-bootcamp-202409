import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { name, email, password, 'password-repeat': passwordRepeat } = req.body

    return logic.registerUser(name, email, password, passwordRepeat).then(() => res.status(201).send())
})