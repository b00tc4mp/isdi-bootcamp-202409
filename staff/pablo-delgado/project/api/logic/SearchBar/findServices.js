import express from 'express';
import Provider from './models/Provider';
import { errors } from './errors';

const { SystemError, ValidationError } = errors;

const router = express.Router();

router.get('/providers', async (req, res) => {
    const { latitude, longitude, postalCode } = req.query;

    try {
        let providers;

        if (latitude && longitude) {
            // Validar las coordenadas
            if (isNaN(latitude) || isNaN(longitude)) {
                throw new ValidationError('Invalid latitude or longitude');
            }

            providers = await Provider.find({
                location: {
                    $near: {
                        $geometry: { type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] },
                        $maxDistance: 5000, // 5km de distancia
                    },
                },
            });
        } else if (postalCode) {
            providers = await Provider.find({ postalCode });
        } else {
            throw new ValidationError('Missing location or postal code');
        }

        res.json(providers);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(error.statusCode).send({ error: error.message });
        }

        console.error(error);
        const systemError = new SystemError('Server error');
        res.status(systemError.statusCode).send({ error: systemError.message });
    }
});

export default router;