import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../../middleware/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId } = req
    const { street, phone, city, country, postalCode } = req.body

    return logic.updateUserProfile(userId, street, phone, city, country, postalCode).then(() => res.status(201).send())
})