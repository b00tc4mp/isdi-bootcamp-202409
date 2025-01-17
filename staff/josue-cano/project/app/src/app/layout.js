"use client";
// import localFont from "next/font/local"; //fuente personalizada
import "./globals.css";
import TheFooter from "./ui/TheFooter";
import PublicHeader from "./ui/PublicHeader";
import PrivateHeader from "./ui/PrivateHeader";
import { logout } from "./logic/auth/";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getToken } from "./utils/session";


export default function RootLayout({ children }) {
  // variable de estado para saber si la sesion es valida
  const [authenticated, setAuthenticated] = useState(false);
  const pathname = usePathname();
  // const router = useRouter();

  function logoutHandler() {
    setAuthenticated(false);
    logout();
  }

  useEffect(() => {
    const token = getToken();

    setAuthenticated(token != undefined);

  }, [pathname]);

  return (
    <html lang="en" data-theme="ekoality">
      <body>
        {/* si esta autenticado private si no public */}
        {authenticated ? <PrivateHeader logout={logoutHandler} /> : <PublicHeader />}
        <main className="container mx-auto">{children}</main>

        <TheFooter />
      </body>
    </html>
  );
}
