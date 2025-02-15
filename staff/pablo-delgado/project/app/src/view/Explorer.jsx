import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import Container from '../view/library/Container';
import Form from '../view/library/Form';
import Button from '../view/library/Button';
import ExplorerIcon from './icons/ExplorerIcon';
import ResultsProvidersList from './ResultsProvidersList';

export default function SearchProviders() {
    const navigate = useNavigate();
    const searchInputRef = useRef(null);
    const [searchParams] = useSearchParams(); // Parámetros de la URL
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Obtener valor de "q", "category" y "postalCode" desde la URL
    useEffect(() => {
        const q = searchParams.get('q');
        const category = searchParams.get('category');
        const postalCode = searchParams.get('postalCode');

        if (q) setQuery(q);
        if (category) setCategory(category);
        if (postalCode) setPostalCode(postalCode);
    }, [searchParams]);

    // Realizar la búsqueda cuando se actualicen los parámetros de búsqueda
    useEffect(() => {
        if (query || category || postalCode) {
            setLoading(true);
            fetchProviders(query, category, postalCode);
        }
    }, [query, category, postalCode]);

    const fetchProviders = async (query, category, postalCode) => {
        try {
            const searchParams = new URLSearchParams();
            if (query) searchParams.append('q', query);
            if (category) searchParams.append('category', category);
            if (postalCode) searchParams.append('postalCode', postalCode);

            const response = await fetch(`http://localhost:8080/providers/search?${searchParams.toString()}`);
            const data = await response.json();

            if (response.ok) {
                setResults(data); // Guardamos los resultados de la búsqueda
            } else {
                console.error(data.message); // Si no se encontraron proveedores
                setResults([]);
            }
        } catch (error) {
            console.error('Error fetching providers:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        const queryValue = searchInputRef.current.value.trim();

        // Si no hay búsqueda, navegar a /explorer
        if (!queryValue) {
            navigate('/explorer');
        } else {
            // Actualiza la URL con el parámetro "q"
            navigate(`/explorer?q=${queryValue}&category=${category}&postalCode=${postalCode}`);
        }
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value); // Actualiza el estado del input
    };

    return (
        <Container>
            <div className="mt-16"> {/* Espacio adicional antes del formulario */}
    <Form onSubmit={handleSearchSubmit} className="w-full max-w-lg relative">
        <div className="relative w-full">
            <input
                ref={searchInputRef}
                className="w-full p-4 pr-16 pl-4 rounded-full text-black shadow-md"
                type="text"
                name="query"
                placeholder="Busca por negocio, servicio o código postal"
                value={query}
                onChange={handleInputChange}
            />
            <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full shadow-md font-semibold"
            >
                Buscar
            </button>
        </div>
    </Form>
</div>
    
            {/* Resultados */}
            <ResultsProvidersList results={results} />
        </Container>
    );
}    
