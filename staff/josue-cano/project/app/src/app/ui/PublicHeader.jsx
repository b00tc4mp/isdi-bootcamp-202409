"use client";
import Image from "next/image";
import Link from "next/link";
import { isAuthenticated } from "../utils/session";

export default function PublicHeader() {
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
                <a>Home</a>
              </li>
              <li>
                <Link
                  className="btn btn-primary btn-sm ml-2 rounded-full btn-outline"
                  href={"/login"}
                >
                  Inicia Sesion
                </Link>
              </li>
              <li>
                <Link
                  className="btn btn-primary text-white btn-sm rounded-full"
                  href={"/register"}
                >
                  Registrate
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
                <a>Vende</a>
              </li>
            </ul>
          </div>
          <Link href="/">
            <Image
              src="/img/ekoalityLogo.png"
              alt="Ekoality Logo "
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">
                <Image
                  src="/icons/sobreNosotros.svg"
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

          <Link
            className="btn btn-primary text-white btn-sm rounded-full"
            href={"/register"}
          >
            Registrate
          </Link>

          <Link
            className="btn btn-primary btn-sm ml-2 rounded-full btn-outline"
            href={"/login"}
          >
            Inicia Sesion
          </Link>
        </div>
      </div>
    </div>
  );
}
