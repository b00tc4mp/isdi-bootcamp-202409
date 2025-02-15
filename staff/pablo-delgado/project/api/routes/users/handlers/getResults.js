import express from 'express';
import { Provider } from './models'

const router = express.Router();


router.get('/providers/search', async (req, res) => { //endpoint to seach
    try {
        const { q, distance, coords } = req.query;

        if (!coords || !distance) {
            return res.status(400).json({ message: 'Faltan parámetros de búsqueda' });
        }

        const [latitude, longitude] = coords.split(',').map(Number);

        if (!latitude || !longitude) {
            return res.status(400).json({ message: 'Coordenadas inválidas' });
        }

        const providers = await Provider.find({
            $or: [
                { name: { $regex: q, $options: 'i' } }, // name - not case sensitive
                { category: { $regex: q, $options: 'i' } } // category
            ],
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: distance * 1000, // Convierte kilómetros a metros
                }
            }
        });

        if (providers.length === 0) {
            return res.status(404).json({ message: 'No se encontraron proveedores' });
        }

        res.status(200).json(providers);
    } catch (error) {
        console.error('Error al buscar proveedores:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

export default router;
