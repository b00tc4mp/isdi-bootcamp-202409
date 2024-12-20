import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { searchServices } from '../logic/searchBar'

export default function Search() {
    console.log('Search -> render');

    const [searchParams, setSearchParams] = useSearchParams();

    const q = searchParams.get('q');
    const distance = searchParams.get('distance') || 0;

    const [results, setResults] = useState([]); // Estado para guardar los resultados
    const [loading, setLoading] = useState(false); // Estado para el spinner de carga
    const [error, setError] = useState(null); // Estado para gestionar errores

    // Lógica de búsqueda al cambiar los parámetros
    useEffect(() => {
        const fetchData = async () => {
            if (q || distance) {
                setLoading(true);
                setError(null); // Resetear errores previos

                try {
                    const userLocation = { lat: 36.7213028, lng: -4.4216366 }; // Coordenadas ejemplo (Málaga)
                    const fetchedResults = await searchServices(q, distance, userLocation);
                    setResults(fetchedResults); // Guardar los resultados en el estado
                } catch (error) {
                    setError('No se pudieron obtener los servicios. Inténtalo más tarde.');
                    console.error('Error en la búsqueda:', error);
                } finally {
                    setLoading(false); // Detener el spinner de carga
                }
            }
        };

        fetchData();
    }, [q, distance]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;

        const qNew = form.q.value;
        const distanceNew = form.distance.value;

        if (qNew !== q || distanceNew !== distance) {
            setSearchParams({ q: qNew, distance: distanceNew });
        }
    };

    return (
        <main className="py-20">
            <h2>Search</h2>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="query" name="q" defaultValue={q || ''} />
                <input type="number" placeholder="distance (km)" name="distance" defaultValue={distance || 1} />

                <button type="submit">Search</button>
            </form>

            {loading && <p>Cargando resultados...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <p>Resultados para: "{q}" en un radio de {distance} km</p>

            {results.length > 0 ? (
                <ul>
                    {results.map((service, index) => (
                        <li key={index}>{service.name}</li> // Ajusta `service.name` según tu modelo
                    ))}
                </ul>
            ) : (
                !loading && <p>No se encontraron resultados.</p>
            )}
        </main>
    );
}
