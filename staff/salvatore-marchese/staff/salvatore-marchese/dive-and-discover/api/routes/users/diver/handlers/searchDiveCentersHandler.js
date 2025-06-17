import searchDiveCenters from '../../../../logic/users/diver/searchDiveCenters.js';
import { createFunctionalHandler } from '../../../helpers/index.js';

export default createFunctionalHandler(async (req, res) => {
    const { query: {city }, userId} = req; // Extract the city from query parameters

    if (!city) {
        return res.status(400).send({ error: 'ValidationError', message: 'City is required' });
    }

    const diveCenters = await searchDiveCenters(userId, city);
    return res.status(200).send(diveCenters);
}); 