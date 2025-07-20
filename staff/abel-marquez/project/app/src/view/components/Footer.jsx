import { Button } from "../library";

export default function Footer() {
    return (
        <footer className="flex w-full justify-around bg-[#F6F6F6] text-3xl">

            <Button className="px-4 py-2 text-black hover:bg-gray-300 rounded-md"onClick={() => console.log("Dashboard clicado")}> 🎯 </Button>

            <Button className="px-4 py-2 text-black hover:bg-gray-300 rounded-md"onClick={() => console.log("Estadísticas clicadas")}> 📊 </Button>

            <Button className="px-4 py-2 text-black hover:bg-gray-300 rounded-md" onClick={() => console.log("Favoritos clicados")}> ⭐ </Button>

            <Button className="px-4 py-2 text-black hover:bg-gray-300 rounded-md" onClick={() => console.log("Calendario clicado")}> 📅 </Button>

            <Button className="px-4 py-2 text-black hover:bg-gray-300 rounded-md" onClick={() => console.log("Configuración clicada")}>⚙️</Button>
        </footer>
    );
}
