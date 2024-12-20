import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los servicios' });
    }
});

export default router;
