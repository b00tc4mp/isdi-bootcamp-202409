import express from 'express';
//import { getCategories } from '../category/index.js'; // Importación correcta

const router = express.Router();

// Ruta para obtener las categorías
router.get('/', async (req, res) => {
    try {
        const categories = await getCategories(); // Obtenemos las categorías desde category.js
        res.status(200).json(categories); 
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ message: 'Error al obtener las categorías' });
    }
});

// Ruta para obtener los centros por categoría
router.get('/:categoryId/provider', async (req, res) => {
    const { categoryId } = req.params;

    try {
        const centers = await Center.findAll({ // Encuentra los centros asociados a la categoría
            where: { categoryId },
        });

        res.status(200).json(centers);
    } catch (error) {
        console.error('Error al obtener los centros para la categoría:', error);
        res.status(500).json({ message: 'Error al obtener los centros para esta categoría' });
    }
});

// Ruta para obtener una categoría por su id
router.get('/:categoryId', async (req, res) => {
    const { categoryId } = req.params;

    try {
        const category = await Category.findOne({ where: { id: categoryId } }); // Sequelize, usa `findById` si usas Mongoose

        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error('Error al obtener la categoría:', error);
        res.status(500).json({ message: 'Error al obtener la categoría' });
    }
});

// Exportamos el router utilizando la sintaxis de ES Modules
export default router;
