import {
  UserCircle,
  PawPrint,
  Gear,
  Heart,
  CreditCard,
  SignOut,
  CaretRight
} from 'phosphor-react';
import { Link } from 'react-router-dom';
import { Footer } from './components/Footer.jsx';
import React, { useState } from 'react';
import { useSettings } from './SettingsContext.jsx'; 

export default function Profile() {
  const { language } = useSettings();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const handleLogout = () => {
    console.log("Logged out!");
    setShowLogoutAlert(false);
   
  };

  
  const texts = {
    es: {
      profileTitle: 'Perfil',
      options: [
        'Detalles de la cuenta',
        'Mascotas',
        'Ajustes',
        'Reseñas',
        'Historial de pagos',
        'Cerrar sesión'
      ],
      logoutConfirm: '¿Seguro que quieres cerrar sesión?',
      yesLogout: 'Sí, cerrar sesión',
      cancel: 'Cancelar',
    },
    en: {
      profileTitle: 'Profile',
      options: [
        'Account Details',
        'Pets',
        'Settings',
        'Reviews',
        'Payment History',
        'Sign Out'
      ],
      logoutConfirm: 'Are you sure you want to log out?',
      yesLogout: 'Yes, log out',
      cancel: 'Cancel',
    }
  };

  const profileOptions = [
    { icon: <UserCircle size={24} />, label: texts[language].options[0], path: '/accountdetails' },
    { icon: <PawPrint size={24} />, label: texts[language].options[1], path: '/mypets' },
    { icon: <Gear size={24} />, label: texts[language].options[2], path: '/settings' },
    { icon: <Heart size={24} />, label: texts[language].options[3], path: '/reviews' },
    { icon: <CreditCard size={24} />, label: texts[language].options[4], path: '/payments' },
    { icon: <SignOut size={24} />, label: texts[language].options[5], action: () => setShowLogoutAlert(true) },
  ];

  return (
    <div className="min-h-screen bg-[#EDF6F9] text-[#006D77] relative flex flex-col">
      {/* main */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 pt-8 pb-32">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold mb-8 text-[#006D77] text-center">{texts[language].profileTitle}</h1>

          <div className="space-y-4">
            {profileOptions.map((option, idx) => {
              const content = (
                <div
                  className="flex items-center justify-between bg-white text-black px-5 py-4 rounded-xl border border-[#006D77] hover:bg-gray-100 transition cursor-pointer shadow"
                  onClick={option.action}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-[#00c49a]">{option.icon}</div>
                    <span className="text-lg">{option.label}</span>
                  </div>
                  <CaretRight size={18} className="text-gray-400" />
                </div>
              );

              return option.path ? (
                <Link to={option.path} key={idx} className="block">
                  {content}
                </Link>
              ) : (
                <div key={idx} className="block">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>

     
      <div className="fixed bottom-0 left-0 w-full">
        <Footer />
      </div>

      {/* confirm modal */}
      {showLogoutAlert && (
        <Alert
          message={texts[language].logoutConfirm}
          onAccepted={handleLogout}
          onCanceled={() => setShowLogoutAlert(false)}
          yesText={texts[language].yesLogout}
          cancelText={texts[language].cancel}
        />
      )}
    </div>
  );
}

// Alert component with translatable texts
const Alert = ({ message, onAccepted, onCanceled, yesText, cancelText }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-80 text-center shadow-lg">
      <p className="text-[#006D77] font-semibold mb-4">{message}</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onAccepted}
          className="bg-[#006D77] text-white px-4 py-2 rounded hover:bg-[#005962]"
        >
          {yesText}
        </button>
        <button
          onClick={onCanceled}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          {cancelText}
        </button>
      </div>
    </div>
  </div>
);
