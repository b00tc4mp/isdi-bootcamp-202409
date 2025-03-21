import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProviderProfile() {
    const { id } = useParams(); // Obtenemos el ID desde la URL
    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Petición al backend para obtener los datos del centro
        fetch(`/api/providers/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProvider(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener el centro:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!provider) return <p>Provider not found. Please, try again</p>;

    return (
        <div>
            <h1>{provider.name}</h1>
            <p>{provider.image}</p>
            <p>{provider.address}</p>
            <p>{provider.phoneNumber}</p>
            <p>{provider.openingHours}</p>
            {/* + detalles en futuro */}
        </div>
    );
}

export default ProviderProfile
