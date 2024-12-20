//WIPP
import express from 'express';
import { Category } from './models';

const router = express.Router();

// Endpoint para obtener las categorías
router.get('/category', async (req, res) => {
    try {
        // Obtenemos todas las categorías de la base de datos
        const categories = await Category.findAll();

        // Respondemos con las categorías en formato JSON
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ message: 'Error al obtener las categorías' });
    }
});

export default router;
