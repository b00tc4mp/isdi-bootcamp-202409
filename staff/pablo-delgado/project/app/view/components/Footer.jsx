import { useLocation, Link } from 'react-router-dom';
import { House, Heart, Calendar, PawPrint } from 'phosphor-react';
import { useSettings } from '../SettingsContext';

const texts = {
  es: {
    home: 'Inicio',
    favourites: 'Favoritos',
    appointments: 'Citas',
    profile: 'Perfil',
  },
  en: {
    home: 'Home',
    favourites: 'Favourites',
    appointments: 'Reservations',
    profile: 'Profile',
  },
};

export default function Footer() {
  const location = useLocation();
  const { language } = useSettings();
  const t = texts[language];

  const activeColor = '#f8e16c';
  const inactiveColor = '#e5e7eb';

  const links = [
    {
      to: '/home',
      icon: House,
      label: t.home,
    },
    {
      to: '/favourites',
      icon: Heart,
      label: t.favourites,
    },
    {
      to: '/appointments',
      icon: Calendar,
      label: t.appointments,
    },
    {
      to: '/profile',
      icon: PawPrint,
      label: t.profile,
    },
  ];

  return (
    <footer className="bg-[#006D77] p-4 h-16 flex justify-around items-center fixed bottom-0 w-full shadow-lg z-50">
      {links.map(({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center ${
              isActive ? 'text-white' : 'text-gray-200'
            }`}
          >
            <Icon
              size={24}
              weight={isActive ? 'fill' : 'regular'}
              color={isActive ? activeColor : inactiveColor}
            />
            <span className="text-xs">{label}</span>
          </Link>
        );
      })}
    </footer>
  );
}

export { Footer };
