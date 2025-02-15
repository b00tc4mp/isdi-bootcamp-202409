import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import logic from '../logic';
import ProviderCard from './ProviderCard'
import { searchProviders } from '../logic/searchBar';

export default function SearchAndResults() {
    const navigate = useNavigate();
    const searchInputRef = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [providers, setProviders] = useState([]);
    const [distance, setDistance] = useState(Number(searchParams.get('distance')) || 10);

    useEffect(() => {
        if (query) {
            loadProviders();
        }
    }, [query, distance]);

    const loadProviders = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = [position.coords.latitude, position.coords.longitude];
                logic
                    .searchProviders(query, distance, coords)
                    .then((results) => setProviders(results))
                    .catch((error) => console.error(error));
            },
            (error) => console.error('Error obtaining location', error)
        );
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const queryValue = searchInputRef.current.value.trim();
        setQuery(queryValue);
        setSearchParams({ q: queryValue, distance });
    };

    const handleProviderClick = (providerId) => {
        navigate(`/provider/${providerId}`); // Cambia esta ruta según tu configuración
    };

    return (
        <section className="p-4">
            {/* Formulario de búsqueda */}
            <form onSubmit={handleSearchSubmit} className="mb-4">
                <div className="flex items-center gap-2">
                    <input
                        ref={searchInputRef}
                        className="border border-gray-300 p-2 w-full"
                        type="text"
                        name="q"
                        placeholder="Busca por centro, servicio o categoría"
                        defaultValue={query}
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2">
                        Buscar
                    </button>
                </div>
            </form>

            {/* Resultados */}
            {providers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {providers.map((provider) => (
                        <div
                            key={provider.id}
                            className="border p-4 rounded shadow cursor-pointer"
                            onClick={() => handleProviderClick(provider.id)}
                        >
                            <ProviderCard provider={provider} />
                        </div>
                    ))}
                </div>
            ) : query ? (
                <p>No se encontraron resultados para "{query}".</p>
            ) : (
                <p>Escribe algo para empezar a buscar.</p>
            )}
        </section>
    );
}
