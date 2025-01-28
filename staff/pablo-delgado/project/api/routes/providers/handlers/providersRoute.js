const express = require('express');
const router = express.Router();
import { Provider } from "../../../../dat/models.js"

// Ruta para obtener proveedores destacados
router.get('/providers', async (req, res) => {
    try {
        const providers = await Provider.find({ image: { $exists: true, $ne: '' } }).sort({ name: 1 });
        res.json(providers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los centros' });
    }
});

module.exports = router;
