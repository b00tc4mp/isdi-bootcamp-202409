import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../helpers/index.js';

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req;
    const { oldPassword, newPassword } = req.body;

    await logic.changeUserPassword(userId, oldPassword, newPassword);
    res.status(204).send();
});
