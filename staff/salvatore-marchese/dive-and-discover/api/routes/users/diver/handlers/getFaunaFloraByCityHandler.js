
import logic from '../../../../logic/index.js';
import { createFunctionalHandler } from '../../../helpers/index.js';

export default createFunctionalHandler((req, res) => {
    const { userId, query: { city } } = req;

    return logic.getFaunaFloraByCity(userId, city)
        .then(faunaFlora => res.json(faunaFlora))
});