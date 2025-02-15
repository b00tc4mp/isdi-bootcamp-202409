const searchServices = async (query, distance, userLocation) => {
    try {
        const response = await fetch(
            `/api/services/search?query=${query}&distance=${distance}&lat=${userLocation.lat}&lng=${userLocation.lng}`
        );
        if (!response.ok) throw new Error('Error al obtener servicios.');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en searchServices:', error);
        throw error;
    }
};

export default searchServices;
