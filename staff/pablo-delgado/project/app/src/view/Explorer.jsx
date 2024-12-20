import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import Container from '../view/library/Container'
import Form from '../view/library/Form';
import Input from '../view/library/Input';
import Button from '../view/library/Button';
import ExplorerIcon from './icons/ExplorerIcon'
//import Image from '../view/library/Image';

export default function SearchProviders() {
    const navigate = useNavigate();
    const searchInputRef = useRef(null);
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState('');

    // const q = searchParams.get('q'); // Obtén el valor de búsqueda desde los parámetros de la URL

    // useEffect(() => {
    //     if (q) {
    //         setQuery(q); // Si hay una búsqueda previa, actualizamos el estado
    //     }
    // }, [q]);

    const handleSearchSubmit = event => {
        event.preventDefault();

        const queryValue = searchInputRef.current.value.trim();
        const form = event.target;
        console.log(form)

        // Asegúrate de acceder al valor del campo "q" de manera segura
        console.log(form.elements)
        //const queryValue = form.elements.q.value.trim();

        // Si el valor de búsqueda está vacío, redirigimos a la página de búsqueda vacía
        if (!queryValue) {
            navigate('/search');
        } else if (location.pathname !== '/search') {
            // Si la ruta no es /search, navegamos a la página de búsqueda con los parámetros de búsqueda
            navigate(`/search?q=${queryValue}`);
        } else {
            // Si ya estamos en la página de búsqueda, actualizamos los parámetros de la URL
            setSearchParams({ q: queryValue });
        }

        setQuery(queryValue); // Actualizamos el estado con el valor de la búsqueda
    };

    const handleInputChange = event => {
        const { value } = event.target;
        setQuery(value); // Actualizamos el estado con el valor ingresado en el input
    };

    return (
        <Container>
            <Form onSubmit={handleSearchSubmit}>
                <Container className="flex flex-row items-center">
                    <input
                        ref={searchInputRef}
                        className="border border-black"
                        type="text"
                        name="q"
                        id="search-input"
                        placeholder="Search by center, service, or category"
                        value={query}
                        onChange={handleInputChange}
                    />
                    <Button type="submit">
                        <ExplorerIcon />
                    </Button>
                </Container>
            </Form>
        </Container>
    );
}
