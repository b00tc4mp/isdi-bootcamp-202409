import { useLocation } from "react-router-dom"

export default function Footer() {
  console.log("Footer -> render")

  const location = useLocation()

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-primary text-white flex justify-around items-center h-16 shadow-lg">
      <button className="flex flex-col items-center">Home</button>
      <button className="flex flex-col items-center">Buscar</button>
      <button className="flex flex-col items-center">Calendario</button>
      <button className="flex flex-col items-center">Favoritos</button>
    </footer>
  )
}
