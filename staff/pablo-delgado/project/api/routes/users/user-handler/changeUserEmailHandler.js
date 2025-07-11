import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../helpers/index.js';

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req;
    const { newEmail } = req.body;

    await logic.changeUserEmail(userId, newEmail);
    res.status(204).send();
});
