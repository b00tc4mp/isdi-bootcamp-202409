"use client";
// import localFont from "next/font/local"; //fuente personalizada
import "./globals.css";
import TheFooter from "./ui/TheFooter";
import PublicHeader from "./ui/PublicHeader";
import PrivateHeader from "./ui/PrivateHeader";
import SearchComponent from "./ui/SearchComponent";
import { validateSession, logout } from "./logic/auth/";
import { useState, useEffect } from "react";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
// className={`${geistSans.variable} ${geistMono.variable} antialiased`}
// export const metadata = {
//   title: "Ekoality",
//   description: "your food",
// };

export default function RootLayout({ children }) {
  // variable de estado para saber si la sesion es valida
  const [authenticated, setAuthenticated] = useState(false);

  function logoutHandler() {
    logout();
    setAuthenticated(false);
  }
  validateSession().then((response) => {
    setAuthenticated(response);
    console.log(response);
  });

  return (
    <html lang="en" data-theme="ekoality">
      <body>
        {/* si esta autenticado private si no public */}
        {authenticated ? (
          <PrivateHeader logout={logoutHandler} />
        ) : (
          <PublicHeader />
        )}
        {children}
        <TheFooter />
      </body>
    </html>
  );
}
