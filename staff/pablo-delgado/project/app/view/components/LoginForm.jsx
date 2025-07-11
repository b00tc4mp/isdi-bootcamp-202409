import React from 'react';
import { useSettings } from '../SettingsContext';

const LoginForm = ({ email, setEmail, password, setPassword, onSubmit }) => {
  const { language } = useSettings();

  const texts = {
    es: {
      title: 'Inicia sesión',
      emailLabel: 'Tu correo electrónico',
      emailPlaceholder: 'nombre@empresa.com',
      passwordLabel: 'Tu contraseña',
      passwordPlaceholder: '••••••••',
      button: 'Inicia sesión'
    },
    en: {
      title: 'Sign in',
      emailLabel: 'Your email',
      emailPlaceholder: 'name@company.com',
      passwordLabel: 'Your password',
      passwordPlaceholder: '••••••••',
      button: 'Login to your account'
    }
  };

  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-lg border-2 border-[#006D77]">
      <form className="space-y-6" onSubmit={onSubmit}>
        <h5 className="text-2xl font-semibold text-[#006D77] mb-4">
          {texts[language].title}
        </h5>

        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-800">
            {texts[language].emailLabel}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={texts[language].emailPlaceholder}
            required
            className="w-full h-9 px-3 border-2 border-[#006D77] rounded placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#83C5BE] focus:border-[#006D77] text-gray-900 text-sm leading-tight"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-800">
            {texts[language].passwordLabel}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={texts[language].passwordPlaceholder}
            required
            className="w-full h-9 px-3 border-2 border-[#006D77] rounded placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#83C5BE] focus:border-[#006D77] text-gray-900 text-sm leading-tight"
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

export { LoginForm };
