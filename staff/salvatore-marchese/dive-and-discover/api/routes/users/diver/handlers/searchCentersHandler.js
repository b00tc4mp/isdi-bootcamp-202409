import logic from '../index.js';
import { createFunctionalHandler } from '../../../helpers/index.js';

export default createFunctionalHandler(async (req, res) => {
    const { q: query, distance } = req.query;

    // Convert distance to a number for validation
    const distanceNum = distance ? Number(distance) : 0;

    const results = await logic(query, distanceNum);
    res.status(200).json(results);
});