import React from "react";
import Footer from "../view/components/Footer.jsx";

const payments = [
  {
    id: 1,
    petName: "Luna",
    centre: "VetCare Barcelona",
    type: "Veterinario",
    date: "2025-05-10",
    amount: "45,00€",
  },
  {
    id: 2,
    petName: "Milo",
    centre: "HappyGroom",
    type: "Peluquero",
    date: "2025-04-28",
    amount: "30,00€",
  },
  {
    id: 3,
    petName: "Rocky",
    centre: "Dog Trainers BCN",
    type: "Adiestrador",
    date: "2025-03-15",
    amount: "60,00€",
  },
];

const PaymentCard = ({ payment }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-4 flex justify-between items-center hover:shadow-lg transition">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          🐶 {payment.petName} — 🏥 {payment.centre} ({payment.type})
        </h3>
        <p className="text-sm text-gray-600">📅 {payment.date}</p>
      </div>
      <p className="text-base font-semibold text-gray-800 whitespace-nowrap">
        💳 {payment.amount}
      </p>
    </div>
  );
};

const Payments = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center px-4 pb-20">
        <div className="w-full max-w-xl mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Historial de pagos</h2>

          {payments.length > 0 ? (
            payments.map((payment) => (
              <PaymentCard key={payment.id} payment={payment} />
            ))
          ) : (
            <p className="text-gray-600 text-center mt-6">Aún no has realizado ningún pago 🐾</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payments;
