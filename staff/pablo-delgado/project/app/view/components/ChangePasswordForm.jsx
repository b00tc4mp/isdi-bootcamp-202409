import React from 'react';

const texts = {
  es: {
    legend: 'Cambiar Contraseña',
    currentPassword: 'Contraseña Actual',
    newPassword: 'Nueva Contraseña',
    repeatPassword: 'Repetir Nueva Contraseña',
    changePassword: 'Cambiar Contraseña',
    placeholders: {
      currentPassword: 'Contraseña Actual',
      newPassword: 'Nueva Contraseña',
      repeatPassword: 'Repetir Nueva Contraseña',
    },
  },
  en: {
    legend: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    repeatPassword: 'Repeat New Password',
    changePassword: 'Change Password',
    placeholders: {
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      repeatPassword: 'Repeat New Password',
    },
  },
};

const ChangePasswordForm = ({ onSubmit, language = 'en' }) => {
  const t = texts[language] || texts.en;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDF6F9]">
      <form className="w-full max-w-sm" onSubmit={onSubmit}>
        <legend className="text-[#006D77] text-center text-4xl font-bold mb-8 block">
          {t.legend}
        </legend>

        <label className="text-[#006D77] font-semibold mb-2 block" htmlFor="currentPassword">
          {t.currentPassword}
        </label>
        <input
          type="password"
          className="w-full mb-4 py-1.5 px-2 bg-white border border-[#006D77] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006D77] focus:border-[#006D77]"
          placeholder={t.placeholders.currentPassword}
          name="currentPassword"
          id="currentPassword"
          required
        />

        <label className="text-[#006D77] font-semibold mb-2 block mt-4" htmlFor="newPassword">
          {t.newPassword}
        </label>
        <input
          type="password"
          className="w-full mb-4 py-1.5 px-2 bg-white border border-[#006D77] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006D77] focus:border-[#006D77]"
          placeholder={t.placeholders.newPassword}
          name="newPassword"
          id="newPassword"
          required
        />

        <label className="text-[#006D77] font-semibold mb-2 block mt-4" htmlFor="repeatPassword">
          {t.repeatPassword}
        </label>
        <input
          type="password"
          className="w-full mb-4 py-1.5 px-2 bg-white border border-[#006D77] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006D77] focus:border-[#006D77]"
          placeholder={t.placeholders.repeatPassword}
          name="repeatPassword"
          id="repeatPassword"
          required
        />

        <button
          type="submit"
          className="mt-12 w-full bg-[#006D77] hover:bg-[#005a60] text-white font-semibold rounded-full py-3 transition-colors duration-300"
        >
          {t.changePassword}
        </button>
      </form>
    </div>
  );
};

export { ChangePasswordForm };
