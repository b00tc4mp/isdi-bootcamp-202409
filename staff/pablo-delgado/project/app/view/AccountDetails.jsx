import { SignOut, EnvelopeSimple, LockKey, Question, CaretRight, ArrowLeft, UserMinus } from "phosphor-react";
import { useState } from "react";
import { Footer } from './components/Footer.jsx';
import logoutUser from "../logic/users/logoutUser.js";
import { Alert } from './components/Alert.jsx';
import { useNavigate } from "react-router-dom";
import { useSettings } from "./SettingsContext.jsx"; 

const texts = {
  es: {
    title: "Detalles de la cuenta",
    backAria: "Volver atrás",
    options: [
      { label: "Cambiar contraseña" },
      { label: "FAQ" },
      { label: "Eliminar cuenta" },
    ],
    alertLogout: "¿Seguro que quieres cerrar sesión?",
    alertDelete: "¿De verdad quieres eliminar tu cuenta? Esta acción no se puede deshacer.",
  },
  en: {
    title: "Account Details",
    backAria: "Go back",
    options: [
      { label: "Change password" },
      { label: "FAQ" },
      { label: "Delete account" },
    ],
    alertLogout: "Are you sure you want to log out?",
    alertDelete: "Do you really want to delete your account? This action cannot be undone.",
  }
};

export default function AccountDetails() {
  const { language } = useSettings(); // using language from context
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const navigate = useNavigate();

  const t = texts[language] || texts.en;

  const handleLogout = async () => {
    try {
      await logoutUser();
      setShowLogoutAlert(false);
      window.location.href = "/login";
    } catch (error) {
      alert(error.message || (language === "es" ? "Error al cerrar sesión" : "Logout error"));
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteAlert(false);
    alert(language === "es" ? "Esta función estará disponible próximamente." : "This feature will be available soon.");
  };

  const options = [
    {
      label: t.options[0].label,
      icon: <LockKey size={24} />,
      action: () => navigate("/changepassword"),
    },
    {
      label: t.options[1].label,
      icon: <Question size={24} />,
      action: () => navigate("/faq"),
    },
    {
      label: t.options[2].label,
      icon: <UserMinus size={24} />,
      action: () => setShowDeleteAlert(true),
    }
  ];

  return (
    <div className="min-h-screen bg-[#EDF6F9] text-black relative flex flex-col">
      {/* go back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 p-2 rounded-full bg-[#006D77] hover:bg-yellow-600 text-white shadow-md"
        aria-label={t.backAria}
      >
        <ArrowLeft size={24} weight="bold" />
      </button>

      <div className="flex-grow flex flex-col items-center justify-start px-4 pt-28 pb-24">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold mb-11 text-[#006D77] text-center">{t.title}</h1>

          <div className="space-y-4">
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={opt.action}
                className="w-full text-left bg-white text-black px-5 py-4 rounded-xl border border-[#006D77] hover:bg-gray-100 transition cursor-pointer shadow flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="text-[#00c49a]">{opt.icon}</div>
                  <span className="text-lg">{opt.label}</span>
                </div>
                <CaretRight size={18} className="text-zinc-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {showLogoutAlert && (
        <Alert
          message={t.alertLogout}
          onAccepted={handleLogout}
          onCanceled={() => setShowLogoutAlert(false)}
        />
      )}

      {showDeleteAlert && (
        <Alert
          message={t.alertDelete}
          onAccepted={handleDeleteAccount}
          onCanceled={() => setShowDeleteAlert(false)}
        />
      )}

      <div className="fixed bottom-0 left-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
