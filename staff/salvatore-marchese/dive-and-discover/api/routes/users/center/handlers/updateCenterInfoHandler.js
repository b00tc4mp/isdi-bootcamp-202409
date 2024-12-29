import logic from '../../../../logic/index.js'
import { createFunctionalHandler } from '../../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, body: dataToBeUpdated, params: {targetUserId}} = req;

    return logic.updateCenterInfo(userId, dataToBeUpdated).then(updatedData => res.json(updatedData))
});