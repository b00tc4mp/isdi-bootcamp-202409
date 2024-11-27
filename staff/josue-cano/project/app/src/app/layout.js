// import localFont from "next/font/local"; //fuente personalizada
import "./globals.css";
import TheFooter from "./ui/TheFooter";
import TheHeader from "./ui/TheHeader";
import SearchComponent from "./ui/SearchComponent";

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
export const metadata = {
  title: "Ekoality",
  description: "your food",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="ekoality">
      <body>
        <TheHeader />
        {children}
        <TheFooter />
       
      </body>
    </html>
  );
}
