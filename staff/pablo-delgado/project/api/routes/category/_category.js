import { Router } from 'express';
import { Category, Provider } from '../models/index.js'; // Asegúrate de que la ruta sea correcta

const router = Router();

router.get('/:categoryId/provider', async (req, res) => {
    const { categoryId } = req.params;

    try {
        
        const centers = await Provider.find()({ // Encuentra los centros asociados a la categoría
            where: { categoryId }, // Asegúrate de que `categoryId` sea la clave foránea correcta
        });

        res.status(200).json(centers);
    } catch (error) {
        console.error('Error al obtener los centros para la categoría:', error);
        res.status(500).json({ message: 'Error al obtener los centros para esta categoría' });
    }
});