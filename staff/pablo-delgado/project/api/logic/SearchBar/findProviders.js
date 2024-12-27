import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import logic from '../logic';

export default function Explorer() {
    const [results, setResults] = useState([]);
    const location = useLocation();

    useEffect(() => {
        // Parsear parámetros de la URL
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('q') || '';
        const distance = searchParams.get('distance') || 0;

        // Lógica para buscar resultados
        const fetchResults = async () => {
            try {
                const fetchedResults = await logic.searchServices({ query, distance });
                setResults(fetchedResults); // Actualiza el estado con los resultados
            } catch (error) {
                console.error('Error al buscar servicios:', error);
            }
        };

        fetchResults();
    }, [location]);

    return (
        <div className="explorer-container py-12 bg-teal-900 text-white">
            <h1 className="text-2xl font-bold mb-6 text-center">Resultados de búsqueda</h1>
            {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map(result => (
                        <div
                            key={result.id}
                            className="result-item bg-white text-black p-4 rounded-lg shadow"
                        >
                            <h2 className="text-lg font-bold">{result.name}</h2>
                            <p>{result.description}</p>
                            <p className="text-sm text-gray-600">Distancia: {result.distance} km</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-400">No se encontraron resultados.</p>
            )}
        </div>
    );
}
