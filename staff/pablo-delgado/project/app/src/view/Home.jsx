import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logic from '../logic';
import Footer from './components/Footer';

export default function Home(props) {
    const [postalCode, setPostalCode] = useState('');
    const navigate = useNavigate();

    const handleSearch = event => {
        event.preventDefault();
        const query = event.target.query.value.trim();
        navigate(`/explorer?q=${query}&postalCode=${postalCode}`);
    };

    return (
        <div className="home-container min-h-screen flex flex-col justify-center items-center bg-teal-900 text-white px-6">
            
            {/* Título */}
            <header className="text-center mb-8">
                <h1 className="text-6xl font-bold flex items-center justify-center gap-2">
                    PetCare <span className="text-white">🐾</span>
                </h1>
                <p className="text-lg mt-2 text-gray-300">¿Qué necesitas para tu mascota?</p>
            </header>

            {/* Buscador */}
            <form onSubmit={handleSearch} className="w-full max-w-lg relative">
                <input
                    type="text"
                    name="query"
                    placeholder="Busca por negocio, servicio o código postal"
                    className="w-full p-4 pr-16 rounded-full text-black shadow-md"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full shadow-md font-semibold"
                >
                    Buscar
                </button>
            </form>

            {/* Categorías */}
            <section className="w-full max-w-lg text-center mt-6">
                <h2 className="text-xl font-bold mb-4">Categorías</h2>
                <div className="flex justify-center gap-3">
                    {['Veterinarios', 'Grooming', 'Cuidados'].map((category, index) => (
                        <div key={index} className="bg-white text-black p-4 rounded-lg shadow-md text-center w-32">
                            {category}
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
