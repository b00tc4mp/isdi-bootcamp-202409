"use client";
import Image from "next/image";
import Link from "next/link";

export default function PrivateHeader({ logout }) {
  // function handlelogout()
  return (
    <div className="sticky top-0 left-0 w-full z-50 bg-white border-b border-[#52A42D] shadow-md">
      <div className="navbar bg-base-100 container mx-auto flex justify-between items-center px-4">
        {/* Logo Section */}
        <Link href="/">
          <Image src="/img/ekoalityLogo.png" alt="Ekoality Logo" width={100} height={50} />
        </Link>

        {/* Menu Items */}
        <div className="hidden lg:flex space-x-4 items-center">
          <Link href="/products/new" className="text-sm font-medium text-gray-800">
            Subir producto
          </Link>
          <Link href="/users/favorites" className="text-sm font-medium text-gray-800">
            Favoritos
          </Link>
          <Link href="/users/chats" className="text-sm font-medium text-gray-800">
            Mensajes
          </Link>
          <Link href="/hazte-pro" className="text-sm font-medium text-gray-800">
            Hazte PRO
          </Link>
          <Link href="/users/profile" className="text-sm font-medium text-gray-800">
            Tú
          </Link>
        </div>

        {/* Logout Button */}
        <button onClick={() => logout()} className="btn btn-primary btn-sm rounded-full text-white ml-4">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
