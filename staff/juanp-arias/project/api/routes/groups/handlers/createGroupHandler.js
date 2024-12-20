import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, body: { name, students } } = req
    return logic.createGroup(userId, name, students).then(() => res.status(201).send())
})