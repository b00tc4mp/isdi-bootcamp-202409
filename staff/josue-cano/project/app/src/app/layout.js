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

  // useEffect(() => {
  //   // Do something here...
  //   validateSession().then((response) => {
  //     if(response.status){
  //       setAuthenticated(response.status);
  //     } else {

  //       router.replace('/');
  //     }
  //   }).catch(error=>{
  //       router.replace('/');

  //   });
  // }, [pathname])

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
