import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import LanguageContext from '../logic/users/LanguageContext.jsx'
import logoegg from '../../../media/logoegg.png'

export default function Home(props) {
    const { language } = useContext(LanguageContext); // Obtiene el idioma actual
    const [postalCode, setPostalCode] = useState('');
    const navigate = useNavigate();

    const translations = {
        es: {
            title: '¿Qué necesitas para tu mascota?',
            placeholder: 'Busca por negocio, servicio o código postal',
            search: 'Buscar',
            categories: ['Veterinarios', 'Peluquería', 'Cuidados']
        },
        en: {
            title: 'What do you need for your pet?',
            placeholder: 'Search by business, service, or postal code',
            search: 'Search',
            categories: ['Vets', 'Grooming', 'Care']
        }
    };

    const handleSearch = event => {
        event.preventDefault();
        const query = event.target.query.value.trim();
        navigate(`/explorer?q=${query}&postalCode=${postalCode}`);
    };

    const handleCategoryClick = (category) => {
        navigate(`/explorer?category=${category}`);
    };

    return (
        <div className="home-container min-h-screen flex flex-col justify-center items-center bg-teal-900 text-white px-6">
            
            {/* Título */}
            <header className="text-center mb-8">
            <img 
        src={logoegg} 
        alt="PetCare Logo" 
        className="w-full max-w-[400px] h-auto mx-auto" 
    />
                <p className="text-lg mt-2 text-gray-300">{translations[language].title}</p>
            </header>

            {/* Buscador */}
            <form onSubmit={handleSearch} className="w-full max-w-lg relative">
                <input
                    type="text"
                    name="query"
                    placeholder={translations[language].placeholder}
                    className="w-full p-4 pr-16 rounded-full text-black shadow-md"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full shadow-md font-semibold"
                >
                    {translations[language].search}
                </button>
            </form>

            {/* Categorías */}
            <section className="w-full max-w-lg text-center mt-6">
                <div className="flex justify-center gap-3">
                    {translations[language].categories.map((category, index) => (
                        <div
                            key={index}
                            onClick={() => handleCategoryClick(category)}
                            className="bg-white text-black p-4 text-center w-32 cursor-pointer hover:bg-gray-200 rounded-full shadow-md font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 active:shadow-xl"
                        >
                            {category}
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
