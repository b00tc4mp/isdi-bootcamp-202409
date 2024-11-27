import Image from "next/image";
import Link from "next/link";

export default function TheFooter() {
  return (
    <footer className="footer bg-neutral text-black p-10 border-t border-green-500">
      <div className="flex justify-between items-center w-full container mx-auto">
        {/* Navigation links */}
        <nav className="flex flex-col space-y-2">
          <Link href="/sobre-nosotros" className="link link-hover text-black">
            Sobre nosotros
          </Link>
          <Link href="/compra" className="link link-hover text-black">
            Compra
          </Link>
          <Link href="/vende" className="link link-hover text-black">
            Vende
          </Link>
          <Link href="/hazte-pro" className="link link-hover text-black">
            Hazte PRO
          </Link>
        </nav>

        {/* Logo */}
        <div className="flex items-center justify-center">
          <Image
            src="/img/ekoalityLogo.png"
            alt="ekoality logo"
            width={150}
            height={50}
          />
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-end">
          <p className="text-black">Copyright © 2025 ekoality</p>
        </div>
      </div>
    </footer>
  );
}
