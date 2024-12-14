import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { id, name, surname, phone, city, postalCode } = req.body

    return logic.saveUser(id, name, surname, phone, city, postalCode).then(() => res.status(201).send())
})