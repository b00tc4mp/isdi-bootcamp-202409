import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logic from '../logic';

import Footer from './components/Footer';
import { ProfileIcon } from './icons';
import { ProviderCard } from './ProviderCard'

export default function Home(props) {
    const [services, setServices] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [postalCode, setPostalCode] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Home -> useEffect "componentDidMount"');

        try {
            const fetchData = async () => {
                // const fetchedServices = await logic.getServices()
                // const fetchedRecommendations = await logic.getRecommendations()
                // setServices(fetchedServices);
                // setRecommendations(fetchedRecommendations);
            };

            fetchData();
        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    }, []);

    const handleSearch = event => {
        event.preventDefault();
        const query = event.target.query.value.trim();

        navigate(`/explorer?q=${query}&postalCode=${postalCode}`);
    };

    const handleUseLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    console.log(`Latitud: ${latitude}, Longitud: ${longitude}`);
                    // Aquí puedes implementar lógica para convertir las coordenadas a un código postal.
                },
                error => {
                    console.error('Error obteniendo ubicación:', error);
                    alert('No se pudo acceder a tu ubicación. Asegúrate de permitir el acceso.');
                }
            );
        } else {
            alert('La geolocalización no es compatible con este navegador.');
        }
    };

    const handleLoginClick = () => {
        props.onLoginClick();
        if (isLoggedIn) {
            setIsLoggedIn(false);
            setShowMenu(false);
        } else {
            setShowMenu(false);
            navigate('/');
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false); 
        setShowMenu(false); 
        navigate('/login');
    };

    return (
        <div className="home-container py-12 bg-teal-900 text-white">

            <header className="text-center mb-6">
                <h1 className="text-5xl font-bold">PetCare 🐾</h1>
                <p className="text-lg mt-2">¿Qué necesitas para tu mascota?</p>
                <form onSubmit={handleSearch} className="mt-4">
                    <input
                        type="text"
                        name="query"
                        placeholder="Busca servicios o negocios"
                        className="p-2 w-3/4 mx-auto block rounded text-black"
                    />
                    <div className="flex justify-center items-center gap-2 mt-4">

                        <button
                            type="submit"
                            className="bg-white text-black px-3 py-2 rounded text-sm"
                        >
                            Buscar
                        </button>
                    </div>
                </form>
            </header>

            <section className="categories text-center my-6">
                <h2 className="text-xl font-bold mb-4">Categorías</h2>
                <div className="overflow-x-auto flex gap-4 px-4">
                    {['Centros veterinarios', 'Grooming', 'Cuidados especializados'].map((category, index) => (
                        <div
                            key={index}
                            className="category-item bg-white text-black p-4 rounded-lg shadow min-w-[100px] text-center"
                        >
                            <p>{category}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="recommendations my-6">
    <h2 className="text-xl font-bold">Recomendado</h2>
    <div className="overflow-x-auto flex gap-4 px-4 mt-4">
        {recommendations.map(center => (
            <div
                key={center._id}
                className="recommendation-card bg-white text-black p-4 rounded-lg shadow min-w-[200px] max-w-[200px] flex-shrink-0"
            >
                <img
                    src={center.image}
                    alt={center.name}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="font-bold text-lg">{center.name}</h3>
                <p className="text-gray-500 text-sm">{center.address}</p>
            </div>
        ))}
    </div>
</section>


            <section className="upcoming-appointments my-6">
                <h2 className="text-xl font-bold">Próximas citas</h2>
                <p className="mt-2 text-green-400">Ninguna cita programada</p>
            </section>

//esto será modificado por banner routeable a register
            <section className="center-info my-6 text-center">
                <p className="text-lg font-bold">Si tienes un centro, eres entrenador canino o cuidador</p>
                <p className="text-green-400 mt-2">Esto te interesa</p>
                <div className="info-box bg-teal-800 p-4 rounded-lg mt-4">
                    <p>Gestiona horarios, citas, y añade fotos atractivas de tu centro.</p>
                </div>
            </section>

            <footer className="text-center mt-6">
                <p>2024 © PetCare S.L.</p>
                <div className="mt-2">
                    <a href="#" className="mx-2">Registra tu centro</a>
                    <a href="#" className="mx-2">Contacto</a>
                </div>
            </footer>

            <Footer />
        </div>
    )
}
    

