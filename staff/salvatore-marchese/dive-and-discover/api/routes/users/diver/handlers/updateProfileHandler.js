import logic from '../../../../logic/index.js'
import { createFunctionalHandler } from '../../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, body: dataToBeUpdated} = req;

    return logic.updateProfile(userId, dataToBeUpdated).then(updatedData => res.json(updatedData))
});