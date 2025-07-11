import React from 'react';
import { useSettings } from './SettingsContext.jsx';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';
import { Footer } from './components/Footer.jsx'

export default function Settings() {
  const { language, toggleLanguage, darkMode, toggleDarkMode } = useSettings();
  const navigate = useNavigate();


  const t = {
    backAria: language === 'es' ? 'Volver atrás' : 'Go back',
  };

  return (
    <main className="min-h-screen bg-[#EDF6F9] flex flex-col items-center pt-20 px-4 relative">
      {/* go back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 p-2 rounded-full bg-[#006D77] hover:bg-blue-600 text-white shadow-md z-50"
        aria-label={t.backAria}
      >
        <ArrowLeft size={24} weight="bold" />
      </button>

      <div className="w-full max-w-md bg-white rounded-xl border-2 border-[#006D77] p-6 space-y-6 shadow-sm z-0">
        <h2 className="text-3xl font-semibold text-center text-[#006D77]">
          {language === 'es' ? 'Ajustes' : 'Settings'}
        </h2>

        {/* language */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <span className="text-black font-medium">
            {language === 'es' ? 'Idioma' : 'Language'}
          </span>
          <button
            onClick={toggleLanguage}
            className="px-4 py-1.5 bg-[#006D77] hover:bg-[#005955] text-white text-sm rounded-full transition duration-200"
          >
            {language === 'es' ? 'Español | Inglés' : 'Spanish | English'}
          </button>
        </div>

        {/* dark mode */}
        <div className="flex items-center justify-between">
          <span className="text-black font-medium">
            {language === 'es' ? 'Modo oscuro' : 'Dark Mode'}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-yellow-400 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>
      <div className="absolute bottom-0 left-0 w-full">
              <Footer />
            </div>
          </div>
    </main>
  );
}
