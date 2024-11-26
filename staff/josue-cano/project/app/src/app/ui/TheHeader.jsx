import Image from "next/image";
import Link from "next/link";

export default function TheHeader() {
  return (
    <div className="border-b border-[#52A42D]">
      <div className="navbar bg-base-100 container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link href="/">
            <Image
              src="/img/ekoalityLogo.png"
              alt="Ekoality Logo "
              width={80}
              height={80}
            />
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">
                <Image
                  src="/icons/sobrenosotros.svg"
                  alt="icono sobre nosotros"
                  width={20}
                  height={20}
                ></Image>{" "}
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link href="/">
                <Image
                  src="/icons/compra.svg"
                  alt="icono compra"
                  width={20}
                  height={20}
                ></Image>{" "}
                Compra
              </Link>
            </li>
            <li>
              <Link href="/">
                <Image
                  src="/icons/vende.svg"
                  alt="vende"
                  width={20}
                  height={20}
                ></Image>{" "}
                Vende
              </Link>
            </li>
            <li>
              <Link href="/">
                <Image
                  src="/icons/pro.svg"
                  alt="icono pro"
                  width={20}
                  height={20}
                ></Image>{" "}
                Hazte Pro
              </Link>
            </li>
          </ul>

          <a className="btn btn-primary text-white btn-sm rounded-full">Registrate</a>

          <a className="btn btn-warning btn-sm ml-2 rounded-full btn-outline">
            Inicia Sesion
          </a>
        </div>
      </div>
    </div>
  );
}
