/* import { useSearchParams } from 'react-router-dom';

export default function Explorer() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const distance = searchParams.get('distance');

    return (
        <div>
            <h1>Explorer</h1>
            <p>Buscando: {query}</p>
            <p>Distancia: {distance} km</p>
        </div>
    );
} */

const express = 'express'
const router = express.Router();
const ServiceModel = '../models/Service'

    router.get('/services/search', async (req, res) => {
        const { query, distance } = req.query;
        const userLocation = [/* lat, lng del usuario */]; // Coordenadas del usuario
    
        try {
            const results = await ServiceModel.find({
                $text: { $search: query }, // Búsqueda por texto
                location: {
                    $near: {
                        $geometry: { type: "Point", coordinates: userLocation },
                        $maxDistance: distance * 1000 // Convertir kms a metros
                    }
                }
            });
    
            res.json(results);
        } catch (error) {
            res.status(500).json({ error: 'Error al buscar servicios.' });
        }
    });
    
    module.exports = router;