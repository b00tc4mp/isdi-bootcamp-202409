import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, body: { name, surname, phone, city, postalCode } } = req

    return logic.updateUserProfile(userId, name, surname, phone, city, postalCode).then(() => res.status(201).send())
})