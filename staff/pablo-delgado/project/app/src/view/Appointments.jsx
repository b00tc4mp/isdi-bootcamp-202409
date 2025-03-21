import { useState, useEffect } from 'react';
import Footer from './components/Footer';
import logic from '../logic'; // Suponiendo que tienes lógica en este archivo

export default function UpcomingAppointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        console.log('UpcomingAppointments -> useEffect "componentDidMount"');

        const fetchAppointments = async () => {
            try {
                const fetchedAppointments = await logic.getAppointments(); // Simula tu lógica para obtener citas
                setAppointments(fetchedAppointments);
            } catch (error) {
                console.error(error);
                alert('Error al obtener las citas');
            }
        };

        fetchAppointments();
    }, []);

    console.log('UpcomingAppointments -> render');

    return (
        <div className="appointments-container py-12 bg-teal-900 text-white">
            {/* Título */}
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold">Próximas Citas</h1>
                <p className="text-lg mt-2">Revisa y organiza tus citas fácilmente</p>
            </header>

            {/* Listado de citas */}
            <section className="appointments-list px-6">
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <div
                            key={appointment.id}
                            className="appointment-item bg-white text-black p-4 rounded-lg shadow mb-4"
                        >
                            <p className="font-bold">📅 {appointment.date}</p>
                            <p className="text-sm">🛠 Con: {appointment.with}</p>
                            <p className="text-sm">🐾 Para: {appointment.animal} ({appointment.reason})</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400">No tienes citas programadas</p>
                )}
            </section>

            <Footer />
        </div>
    );
}
