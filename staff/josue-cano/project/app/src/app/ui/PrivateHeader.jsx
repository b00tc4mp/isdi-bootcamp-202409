"use client";
import Image from "next/image";
import Link from "next/link";

export default function PrivateHeader({ logout }) {
  // function handlelogout()
  return (
    <div className="border-b border-[#52A42D] bg-white">
      <div className="navbar container mx-auto flex justify-between items-center py-2">
        {/* Logo Section */}
        <Link href="/">
          <Image
            src="/img/ekoalityLogo.png"
            alt="Ekoality Logo"
            width={100}
            height={50}
          />
        </Link>

        {/* Menu Items */}
        <div className="hidden lg:flex space-x-4 items-center">
          <Link
            href="/newProduct"
            className="text-sm font-medium text-gray-800"
          >
            Subir producto
          </Link>
          <Link href="/favoritos" className="text-sm font-medium text-gray-800">
            Favoritos
          </Link>
          <Link href="/mensajes" className="text-sm font-medium text-gray-800">
            Mensajes
          </Link>
          <Link href="/hazte-pro" className="text-sm font-medium text-gray-800">
            Hazte PRO
          </Link>
          <Link href="/perfil" className="text-sm font-medium text-gray-800">
            Tú
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => logout()}
          className="btn btn-primary btn-sm rounded-full text-white ml-4"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
