"use client";
import Image from "next/image";
import Link from "next/link";

export default function PrivateHeader({ logout }) {
  // function handlelogout()
  return (
    <div className="sticky top-0 left-0 w-full z-50 bg-white border-b border-[#52A42D] shadow-md">
      <div className="navbar bg-base-100 container mx-auto flex justify-between items-center px-4">
        {/* Navbar Start */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          {/* Dropdown para dispositivos móviles */}
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost" aria-label="Toggle navigation menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-lg z-10 mt-3 w-60 p-4 shadow-lg space-y-3">
              {/* Botón Inicia Sesión */}
              <li>
                <Link className="btn bg-green-600 text-white hover:bg-green-700 btn-sm w-full" href="/products/new">
                  Subir producto
                </Link>
              </li>

              {/* Botón Regístrate */}
              <li>
                <Link className="btn bg-green-600 text-white hover:bg-green-700 btn-sm w-full" href="/users/favorites">
                  Favoritos
                </Link>
              </li>

              {/* Opción Sobre Nosotros */}
              <li>
                <Link href="/users/chats" className="btn bg-green-600 text-white hover:bg-green-700 btn-sm w-full">
                  Mensajes
                </Link>
              </li>

              {/* Opción Compra */}
              <li>
                <Link href="/#exCompra" className="btn bg-green-600 text-white hover:bg-green-700 btn-sm w-full">
                  Hazte PRO
                </Link>
              </li>

              {/* Opción Vende */}
              <li>
                <Link href="/users/profile" className="btn bg-green-600 text-white hover:bg-green-700 btn-sm w-full">
                  Tú
                </Link>
              </li>
            </ul>
          </div>
          {/* Logo */}
          <Link href="/" className="">
            <Image src="/img/ekoalityLogo.png" alt="Ekoality Logo" width={100} height={40} className="object-contain" />
          </Link>
          <div className=""></div>
        </div>

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
          <Link href="/#exCompra" className="text-sm font-medium text-gray-800">
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
