import React, { useState, useEffect } from 'react';

export function SearchWithGeo() {
    const [userLocation, setUserLocation] = useState(null);
    const [postalCode, setPostalCode] = useState('');
    const [results, setResults] = useState([]);

    // Función para obtener la ubicación del usuario
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });

                    // Llamada a la API para obtener el código postal
                    const response = await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                    );
                    const data = await response.json();
                    setPostalCode(data.postcode);
                },
                (error) => console.error('Error getting location:', error)
            );
        } else {
            console.error('Geolocation not supported');
        }
    };

    // Función para buscar servicios
    const handleSearch = async () => {
        let query = '';
        if (userLocation) {
            const { latitude, longitude } = userLocation;
            query = `latitude=${latitude}&longitude=${longitude}`;
        } else if (postalCode) {
            query = `postalCode=${postalCode}`;
        }

        const response = await fetch(`/api/providers?${query}`);
        const data = await response.json();
        setResults(data);
    };

    return (
        <div>
            <button onClick={getUserLocation}>Usar mi ubicación</button>
            <input
                type="text"
                value={postalCode}
                placeholder="Introduce tu código postal"
                onChange={(e) => setPostalCode(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>
            <div>
                <h2>Resultados</h2>
                <ul>
                    {results.map((provider) => (
                        <li key={provider._id}>{provider.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
