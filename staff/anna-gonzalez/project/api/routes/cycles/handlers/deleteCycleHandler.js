import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { start } } = req

    return logic.deleteCycle(userId, start).then(() => res.status(204).send())
})