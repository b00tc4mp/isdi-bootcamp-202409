import getFaunaFloraByCity from '../../../../logic/users/diver/getFaunaFloraByCity.js';
import { createFunctionalHandler } from '../../../helpers/index.js';

export default createFunctionalHandler(async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).send({
            error: 'ValidationError',
            message: 'City query parameter is required',
        });
    }

    try {
        const faunaFloraData = await getFaunaFloraByCity(city);
        res.status(200).send(faunaFloraData);
    } catch (err) {
        console.error('Error in getFaunaFloraHandler:', err);
        res.status(err.statusCode || 500).send({
            error: err.name || 'SystemError',
            message: err.message || 'An unexpected error occurred',
        });
    }
});