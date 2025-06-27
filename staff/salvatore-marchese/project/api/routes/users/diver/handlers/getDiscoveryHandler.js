import getDiscovery from '../../../../logic/users/diver/getDiscovery.js'
import { createFunctionalHandler } from '../../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).send({ error: 'ValidationError', message: 'City is required' });
    }

    const discoveryData = await getDiscovery(city);
    return res.status(200).send(discoveryData);
});