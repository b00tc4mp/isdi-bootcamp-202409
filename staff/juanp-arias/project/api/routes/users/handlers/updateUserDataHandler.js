import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId } = req.params
    const { name, email, dateOfBirth, role } = req.body
    return logic.updateUserData(userId, name, email, dateOfBirth, role)
        .then(() => res.status(201).send())
})