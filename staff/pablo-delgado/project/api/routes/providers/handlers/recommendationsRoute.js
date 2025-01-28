router.get('/providers/recommendations', async (req, res) => {
    try {
        const recommendations = await Provider.find()
            .sort({ reviewsCount: -1 }) // Ordenar por reseñas
            .limit(5); // Limitar a 5 resultados
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo recomendaciones' });
    }
});
