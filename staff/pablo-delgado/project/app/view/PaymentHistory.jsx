import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';
import { useSettings } from './SettingsContext.jsx';
import { Footer } from './components/Footer.jsx'

const mockPayments = [
  {
    id: 1,
    date: '2025-05-25',
    amount: 45.0,
    serviceType: 'Veterinary',
    paymentMethod: 'Card',
    provider: 'El Bosque Clinic',
  },
  {
    id: 2,
    date: '2025-05-20',
    amount: 30.0,
    serviceType: 'Grooming',
    paymentMethod: 'In Clinic',
    provider: 'GuauLook',
  },
  {
    id: 3,
    date: '2025-05-18',
    amount: 60.0,
    serviceType: 'Training',
    paymentMethod: 'Mobile Payment',
    provider: 'DogTrainer Pro',
  },
  {
    id: 4,
    date: '2025-05-15',
    amount: 25.0,
    serviceType: 'Pet Sitter',
    paymentMethod: 'Card',
    provider: 'PetNanny Lola',
  },
  {
    id: 5,
    date: '2025-05-10',
    amount: 80.0,
    serviceType: 'Boarding',
    paymentMethod: 'Mobile Payment',
    provider: 'HappyPaws Hotel',
  },
];


const paymentMethodsTranslations = {
  es: {
    All: 'Todos los pagos',
    Card: 'Tarjeta',
    'In Clinic': 'En clínica',
    'Mobile Payment': 'Pago móvil',
  },
  en: {
    All: 'All Payments',
    Card: 'Card',
    'In Clinic': 'In Clinic',
    'Mobile Payment': 'Mobile Payment',
  },
};

const PaymentHistory = () => {
  const navigate = useNavigate();
  const { language } = useSettings();
  const [filter, setFilter] = useState('All');

 
  const t = {
    title: language === 'es' ? 'Historial de pagos' : 'Payment History',
    backAria: language === 'es' ? 'Volver atrás' : 'Go back',
    providerLabel: language === 'es' ? 'Proveedor:' : 'Provider:',
    paymentMethodLabel: language === 'es' ? 'Método de pago:' : 'Payment method:',
  };

  // Filter by method, adapting the key to English as in mockPayments
  // If filter is 'All', show all
  const filterKey = filter === paymentMethodsTranslations[language].All ? 'All' : filter;

  const filteredPayments = mockPayments.filter((payment) =>
    filterKey === 'All' ? true : payment.paymentMethod === filterKey
  );

  return (
    <div className="min-h-screen bg-[#EDF6F9]">
      <div className="relative max-w-3xl mx-auto px-4 pt-10 pb-20">
        {/* go back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 p-2 rounded-full bg-[#006D77] hover:bg-blue-600 text-white shadow-md"
          aria-label={t.backAria}
        >
          <ArrowLeft size={24} weight="bold" />
        </button>

        
        <h2 className="text-2xl font-bold mb-6 text-[#006D77] text-center">{t.title}</h2>

        {/* filter dropdown */}
        <div className="mb-6 flex justify-center">
          <select
            className="p-2 border border-[#006D77] rounded-md bg-[#006D77] text-white font-semibold"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {Object.entries(paymentMethodsTranslations[language]).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* card payments */}
        <div className="space-y-4">
          {filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className="bg-white rounded-2xl shadow-md p-4 border border-[#006D77]"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-[#006D77]">{payment.serviceType}</span>
                <span className="text-sm text-gray-500">{payment.date}</span>
              </div>
              <div className="text-gray-700 mb-1">
                <strong className="font-extrabold text-black">{t.providerLabel}</strong> {payment.provider}
              </div>
              <div className="text-gray-700 mb-1">
                <strong className="font-extrabold text-black">{t.paymentMethodLabel}</strong> {payment.paymentMethod}
              </div>

              <div className="text-[#006D77] font-bold text-lg">
                €{payment.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    <div className="absolute bottom-0 left-0 w-full">
            <Footer />
          </div>
        </div>
  );
};

export default PaymentHistory;
