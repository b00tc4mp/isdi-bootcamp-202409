import React from 'react';
import { useSettings } from '../SettingsContext';

const RegisterForm = ({ onSubmit }) => {
  const { language } = useSettings();

  const texts = {
    es: {
      title: 'Registro',
      name: 'Nombre',
      email: 'Correo electrónico',
      password: 'Contraseña',
      repeatPassword: 'Repetir contraseña',
      placeholderName: 'Nombre',
      placeholderEmail: 'Correo',
      placeholderPassword: 'Contraseña',
      placeholderRepeatPassword: 'Repite la contraseña',
      button: 'Registrarse'
    },
    en: {
      title: 'Register',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      repeatPassword: 'Repeat Password',
      placeholderName: 'Name',
      placeholderEmail: 'Email',
      placeholderPassword: 'Password',
      placeholderRepeatPassword: 'Repeat Password',
      button: 'Register'
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#edf6f9] px-4">
      <form
        className="w-full max-w-sm bg-white border-2 border-[#006D77] rounded-lg p-6 space-y-4"
        onSubmit={onSubmit}
      >
        <h2 className="text-2xl font-semibold text-[#006D77] mb-4">
          {texts[language].title}
        </h2>

        <div className="max-w-sm">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {texts[language].name}
          </label>
          <input
            type="text"
            name="name"
            placeholder={texts[language].placeholderName}
            className="w-full h-9 px-3 border border-[#006D77] rounded placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#83C5BE] focus:border-[#006D77] text-gray-900 text-sm leading-tight"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {texts[language].email}
          </label>
          <input
            type="email"
            name="email"
            placeholder={texts[language].placeholderEmail}
            className="w-full h-9 px-3 border border-[#006D77] rounded placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#83C5BE] focus:border-[#006D77] text-gray-900 text-sm leading-tight"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {texts[language].password}
          </label>
          <input
            type="password"
            name="password"
            placeholder={texts[language].placeholderPassword}
            className="w-full h-9 px-3 border border-[#006D77] rounded placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#83C5BE] focus:border-[#006D77] text-gray-900 text-sm leading-tight"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {texts[language].repeatPassword}
          </label>
          <input
            type="password"
            name="password-repeat"
            placeholder={texts[language].placeholderRepeatPassword}
            className="w-full h-9 px-3 border border-[#006D77] rounded placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#83C5BE] focus:border-[#006D77] text-gray-900 text-sm leading-tight"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#006D77] hover:bg-[#054A52] focus:ring-4 focus:outline-none focus:ring-yellow-300 text-white font-semibold rounded-xl px-5 py-3 transition-colors duration-300 mt-4"
        >
          {texts[language].button}
        </button>
      </form>
    </div>
  );
};

export { RegisterForm };
