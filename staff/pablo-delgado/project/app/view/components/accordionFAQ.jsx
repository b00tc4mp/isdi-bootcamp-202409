import { useSettings } from "../SettingsContext.jsx"

const faqs = {
  en: [
    {
      question: "How do I create an account?",
      answer: "Click on the \"Sign Up\" button and follow the steps to register with your email and password. It only takes a minute!"
    },
    {
      question: "How can I search for a center, trainer, or grooming service for my pet?",
      answer: `Simply type what you're looking for in the search bar and hit "Search".\n
      You can search by category or by city – we support cities like Madrid, Barcelona, Málaga, and Valencia.\n
      You can also click the category buttons below the search bar for quick access to the most popular types of services.`
    },
    {
      question: "Where can I find my favorite centers?",
      answer: "After logging in, scroll down to the footer and click on \"Favorites\". There you’ll find all the centers you’ve saved."
    },
    {
      question: "How can I view my past and upcoming appointments?",
      answer: "Once you're logged in, go to the footer and click on \"Appointments\". You'll see both your upcoming and previous bookings."
    },
    {
      question: "How do I change my password?",
      answer: `First, log in and go to the footer. Click on "Profile" and then "Account Settings".\n
      In the "Change Password" section, enter your current password, your new password, confirm the new password, and save the changes.`
    },
    {
      question: "Where can I find my reviews?",
      answer: "You can access your reviews from the Profile section. Just click on \"Reviews\" to see the comments you've written about centers, grooming services, trainers, boardings, or petsitters."
    }
  ],
  es: [
    {
      question: "¿Cómo creo una cuenta?",
      answer: "Haz clic en el botón \"Registrarse\" y sigue los pasos para registrarte con tu correo electrónico y contraseña. ¡Solo te llevará un minuto!"
    },
    {
      question: "¿Cómo puedo buscar un centro, adiestrador o peluquería para mi mascota?",
      answer: `Simplemente escribe lo que buscas en la barra de búsqueda y pulsa "Buscar".\n
      Puedes buscar por categoría o por ciudad – soportamos ciudades como Madrid, Barcelona, Málaga y Valencia.\n
      También puedes hacer clic en los botones de categoría debajo de la barra para acceder rápido a los tipos de servicios más populares.`
    },
    {
      question: "¿Dónde puedo encontrar mis centros favoritos?",
      answer: "Después de iniciar sesión, baja al pie de página y haz clic en \"Favoritos\". Allí encontrarás todos los centros que has guardado."
    },
    {
      question: "¿Cómo puedo ver mis citas pasadas y próximas?",
      answer: "Una vez que hayas iniciado sesión, ve al pie de página y haz clic en \"Citas\". Verás tanto tus reservas próximas como las anteriores."
    },
    {
      question: "¿Cómo cambio mi contraseña?",
      answer: `Primero, inicia sesión y ve al pie de página. Haz clic en "Perfil" y luego en "Configuración de cuenta".\n
      En la sección "Cambiar contraseña", introduce tu contraseña actual, la nueva, confirma la nueva y guarda los cambios.`
    },
    {
      question: "¿Dónde puedo encontrar mis valoraciones?",
      answer: "Puedes acceder a tus valoraciones desde la sección Perfil. Solo tienes que hacer clic en \"Reseñas\" para ver los comentarios que has escrito sobre centros, peluquerías, adiestradores, residencias o cuidadores."
    }
  ]
};

export default function AccordionFAQ() {
  const { language } = useSettings();
  const items = faqs[language] || faqs.en;

  return (
    <div className="space-y-2">
      {items.map(({ question, answer }, index) => (
        <div key={index} className="collapse collapse-plus bg-white border border-[#006D77]">
          <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
          <div className="collapse-title font-semibold">{question}</div>
          <div className="collapse-content text-sm whitespace-pre-line">{answer}</div>
        </div>
      ))}
    </div>
  );
}
