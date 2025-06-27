import logic from '../../../../logic/index.js'
import { createFunctionalHandler } from '../../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { targetUserId }, body: dataToBeUpdated } = req;

    return logic.updateProfile(userId, targetUserId, dataToBeUpdated).then(updatedData => res.json(updatedData))
});