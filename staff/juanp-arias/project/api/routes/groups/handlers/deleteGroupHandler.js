import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { groupId } } = req

    return logic.deleteGroup(userId, groupId).then(() => res.status(204).send())
})