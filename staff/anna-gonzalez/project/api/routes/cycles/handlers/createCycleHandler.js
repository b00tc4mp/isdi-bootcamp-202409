import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, body: { start } } = req

    return logic.createCycle(userId, start).then(() => res.status(201).send())
})