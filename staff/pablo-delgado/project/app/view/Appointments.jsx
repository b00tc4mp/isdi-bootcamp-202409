import React, { useState } from "react";
import Footer from "./components/Footer.jsx";
import {
  Dog,
  Calendar,
  Clock,
  User,
  CalendarBlank,
  CalendarX,
} from "phosphor-react";
import { useSettings } from "./SettingsContext.jsx";


const typeLabels = {
  es: {
    vet: "Veterinario",
    grooming: "Peluquería",
    petsitter: "Cuidador",
  },
  en: {
    vet: "Vet",
    grooming: "Grooming",
    petsitter: "Petsitter",
  },
};

const appointments = [
  {
    id: 9,
    petName: "Luna",
    date: "2025-06-10",
    time: "14:00",
    partner: "Dog Care Barcelona",
    partnerId: 9,
    type: "petsitter",
    status: "futura",
  },
  {
    id: 6,
    petName: "Rocky",
    date: "2025-05-05",
    time: "10:00",
    partner: "Waku-Waku Mascotas Paralelo 180",
    partnerId: 6,
    type: "grooming",
    status: "pasada",
  },
  {
    id: 3,
    petName: "Milo",
    date: "2025-06-05",
    time: "09:30",
    partner: "Clínica Veterinària Family Vet",
    partnerId: 3,
    type: "vet",
    status: "futura",
  },
];

const monthNames = {
  es: [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ],
  en: [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ],
};

const texts = {
  es: {
    title: "Tus citas",
    upcoming: "Próximas",
    past: "Pasadas",
    filterMonth: "Mes (todos)",
    filterYear: "Año (todos)",
    noPast: "No hay citas pasadas para los filtros seleccionados.",
    goToCenter: "Ir al centro",
    bookAgain: "Reservar de nuevo",
  },
  en: {
    title: "Your appointments",
    upcoming: "Upcoming",
    past: "Past",
    filterMonth: "Month (all)",
    filterYear: "Year (all)",
    noPast: "No past appointments for the selected filters.",
    goToCenter: "Go to center",
    bookAgain: "Book again",
  }
};

const AppointmentCard = ({ appointment, language }) => {
  const url = `http://localhost:5173/partner/${appointment.partnerId}`;
  const t = texts[language];
  const typeLabel = typeLabels[language][appointment.type] || appointment.type;

  return (
    <div
      className="bg-white shadow-md rounded-2xl p-4 mb-4 flex justify-between items-center hover:shadow-lg transition border-2"
      style={{ borderColor: "#006D77" }}
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
          <Dog size={20} color="#006D77" />
          {appointment.petName}
        </h3>
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <Calendar size={16} /> {appointment.date} — <Clock size={16} /> {appointment.time}
        </p>
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <User size={16} /> {appointment.partner} ({typeLabel})
        </p>
      </div>
      <a
        href={url}
        className="bg-yellow-400 hover:bg-yellow-300 text-white font-medium px-3 py-1.5 rounded-lg text-xs whitespace-nowrap inline-block text-center"
      >
        {appointment.status === "pasada" ? t.bookAgain : t.goToCenter}
      </a>
    </div>
  );
};

const Appointments = () => {
  const { language } = useSettings();
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const t = texts[language];
  const months = monthNames[language];
  const years = [2024, 2025, 2026];

  const filteredPastAppointments = appointments.filter((a) => {
    if (a.status !== "pasada") return false;

    if (!filterMonth && !filterYear) return true;

    const dateObj = new Date(a.date);
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    if (filterMonth && filterYear) {
      return month === parseInt(filterMonth) && year === parseInt(filterYear);
    }
    if (filterMonth) {
      return month === parseInt(filterMonth);
    }
    if (filterYear) {
      return year === parseInt(filterYear);
    }

    return true;
  });

  const futuras = appointments.filter((a) => a.status === "futura");

  return (
    <div className="min-h-screen flex flex-col justify-start items-center pt-20 px-4">
      <div className="w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">{t.title}</h2>

        {futuras.length > 0 && (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <CalendarBlank size={20} color="#006D77" />
              {t.upcoming}
            </h3>
            {futuras.map((appt) => (
              <AppointmentCard key={appt.id} appointment={appt} language={language} />
            ))}
          </>
        )}

        {appointments.some(a => a.status === "pasada") && (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2 flex items-center gap-2">
              <CalendarX size={20} color="#006D77" />
              {t.past}
            </h3>

            <div className="flex gap-4 mb-4">
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="border rounded px-2 py-1"
                style={{
                  backgroundColor: "#006D77",
                  color: "white",
                  borderColor: "#028484",
                }}
              >
                <option value="" style={{ color: "black" }}>{t.filterMonth}</option>
                {months.map((m, i) => (
                  <option key={i + 1} value={i + 1} style={{ color: "black" }}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="border rounded px-2 py-1"
                style={{
                  backgroundColor: "#006D77",
                  color: "white",
                  borderColor: "#028484",
                }}
              >
                <option value="" style={{ color: "black" }}>{t.filterYear}</option>
                {years.map((y) => (
                  <option key={y} value={y} style={{ color: "black" }}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {filteredPastAppointments.length > 0 ? (
              filteredPastAppointments.map((appt) => (
                <AppointmentCard key={appt.id} appointment={appt} language={language} />
              ))
            ) : (
              <p className="text-center text-gray-500 mt-4">
                {t.noPast}
              </p>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Appointments;
