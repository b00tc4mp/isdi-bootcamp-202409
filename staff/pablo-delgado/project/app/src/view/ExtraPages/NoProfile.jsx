import Footer from '../components/Footer'

export function NoProfile() {
    return (
        <div className="profile-placeholder-container py-12 bg-teal-900 text-white text-center">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold">Perfil</h1>
                <p className="text-lg mt-2">Gestiona tu cuenta y preferencias</p>
            </header>

            <section className="flex flex-col items-center justify-center h-64">
                <p className="text-gray-300 text-lg mb-4">Accede a tu perfil iniciando sesión o registrándote.</p>
                <button
                    className="bg-white text-teal-900 font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100"
                    onClick={() => console.log('Redirigir a login o registro')}
                >
                    Inicia sesión o regístrate
                </button>
            </section>

            
        </div>
    );
}
