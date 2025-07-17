import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChangePasswordForm } from './components/ChangePasswordForm.jsx';
import { changePassword } from '../logic/users/changePassword.js';
import { ArrowLeft } from 'phosphor-react';
import { useSettings } from './SettingsContext.jsx';
import { Footer } from './components/Footer.jsx'

export default function ChangePassword() {
  const navigate = useNavigate();
  const { language } = useSettings();

 
  const texts = {
    es: {
      passwordsNoMatch: 'Las contraseñas no coinciden',
      passwordTooShort: 'La contraseña debe tener al menos 6 caracteres',
      changeSuccess: 'Contraseña cambiada correctamente',
      changeError: 'Error al cambiar la contraseña',
      goBack: 'Volver atrás',
    },
    en: {
      passwordsNoMatch: "Passwords don't match",
      passwordTooShort: 'Password must be at least 6 characters',
      changeSuccess: 'Password changed successfully',
      changeError: 'Error changing password',
      goBack: 'Go back',
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const currentPassword = form.currentPassword.value.trim();
    const newPassword = form.newPassword.value.trim();
    const repeatPassword = form.repeatPassword.value.trim();

    if (newPassword !== repeatPassword) {
      alert(texts[language].passwordsNoMatch);
      return;
    }

    if (newPassword.length < 6) {
      alert(texts[language].passwordTooShort);
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      alert(texts[language].changeSuccess);
      navigate('/profile');
    } catch (error) {
      alert(error.message || texts[language].changeError);
    }
  };

  return (
    <div className="relative bg-[#EDF6F9] text-black px-4 flex flex-col items-center pt-4 pb-16">
      <button
      onClick={() => navigate(-1)}
      className="absolute top-6 left-6 p-2 rounded-full bg-[#006D77] hover:bg-blue-600 text-white shadow-md"
      aria-label="Volver atrás"
    >
      <ArrowLeft size={24} weight="bold" />
    </button>

      <div className="w-full max-w-md mt-2">
        <ChangePasswordForm language={language} />
      </div>
    <Footer />
    </div>
  );
}
