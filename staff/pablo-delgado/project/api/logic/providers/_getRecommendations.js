const getRecommendations = async () => {
    const response = await fetch('/api/providers/recommendations'); // Ajusta la URL si es diferente
    if (!response.ok) throw new Error('Error obteniendo recomendaciones');
    const data = await response.json();
    return data;
};

export default {
    getRecommendations
};
