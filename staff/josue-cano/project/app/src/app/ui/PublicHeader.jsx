"use client";
import Image from "next/image";
import Link from "next/link";

export default function PublicHeader() {
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
                <Link
                  className="btn btn-outline border-green-600 text-green-600 hover:bg-green-600 hover:text-white btn-sm w-full"
                  href="/login">
                  Inicia Sesión
                </Link>
              </li>

              {/* Botón Regístrate */}
              <li>
                <Link className="btn bg-green-600 text-white hover:bg-green-700 btn-sm w-full" href="/register">
                  Regístrate
                </Link>
              </li>

              {/* Opción Sobre Nosotros */}
              <li>
                <Link href="/#sobrenosotros" className="flex items-center space-x-3 text-gray-800 hover:text-green-600">
                  <Image src="/icons/sobreNosotros.svg" alt="icono sobre nosotros" width={24} height={24} />
                  <span>Sobre Nosotros</span>
                </Link>
              </li>

              {/* Opción Compra */}
              <li>
                <Link href="/#listComponent" className="flex items-center space-x-3 text-gray-800 hover:text-green-600">
                  <Image src="/icons/compra.svg" alt="icono compra" width={24} height={24} />
                  <span>Compra</span>
                </Link>
              </li>

              {/* Opción Vende */}
              <li>
                <Link href="/#exCompra" className="flex items-center space-x-3 text-gray-800 hover:text-green-600">
                  <Image src="/icons/vende.svg" alt="icono vende" width={24} height={24} />
                  <span>Vende</span>
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

        {/* Navbar End - Menú Horizontal para Escritorio */}
        <div className="hidden lg:flex items-center space-x-4">
          <ul className="menu menu-horizontal px-1 space-x-4">
            <li>
              <Link href="/#sobrenosotros" className="flex items-center">
                <Image src="/icons/sobreNosotros.svg" alt="icono sobre nosotros" width={20} height={20} />
                <span className="ml-2">Sobre Nosotros</span>
              </Link>
            </li>
            <li>
              <Link href="/#listComponent" className="flex items-center">
                <Image src="/icons/compra.svg" alt="icono compra" width={20} height={20} />
                <span className="ml-2">Compra</span>
              </Link>
            </li>
            <li>
              <Link href="/#exCompra" className="flex items-center">
                <Image src="/icons/vende.svg" alt="icono vende" width={20} height={20} />
                <span className="ml-2">Vende</span>
              </Link>
            </li>
            <li>
              <Link href="/" className="flex items-center">
                <Image src="/icons/pro.svg" alt="icono pro" width={20} height={20} />
                <span className="ml-2">Hazte Pro</span>
              </Link>
            </li>
          </ul>

          <div className="flex space-x-2">
            <Link className="btn btn-primary text-white btn-sm rounded-full" href="/register">
              Regístrate
            </Link>

            <Link className="btn btn-primary btn-sm rounded-full btn-outline" href="/login">
              Inicia Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
