import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';
import AccordionFAQ from "./components/accordionFAQ.jsx";
import { useSettings } from "./SettingsContext.jsx"; 
import { Footer } from './components/Footer.jsx'

const texts = {
  es: {
    title: 'Preguntas Frecuentes',
    description: 'Aquí encontrarás respuestas a las preguntas más comunes sobre cómo usar la plataforma.',
    backAria: 'Volver atrás',
  },
  en: {
    title: 'Frequently Asked Questions',
    description: "Here you'll find answers to the most common questions about how to use the platform.",
    backAria: 'Go back',
  }
};

export default function FAQ() {
  const { language } = useSettings();
  const navigate = useNavigate();
  const t = texts[language] || texts.en;

  return (
    <div className="min-h-screen bg-[#EDF6F9] flex flex-col items-center px-6 py-20 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 p-2 rounded-full bg-[#006D77] hover:bg-blue-600 text-white shadow-md"
        aria-label={t.backAria}
      >
        <ArrowLeft size={24} weight="bold" />
      </button>

      <div className="w-full max-w-3xl mt-5">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold mb-6">{t.title}</h1>
          <p className="text-[#006D77] mb-5">{t.description}</p>
        </div>
        <AccordionFAQ language={language} />
      </div>
      <Footer />
    </div>
  );
}
