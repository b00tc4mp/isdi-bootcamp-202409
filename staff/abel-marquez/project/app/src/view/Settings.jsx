import { Button} from "./library"
import { Header, Footer } from "./components"

export default function Settings () {

    return (
        <main className="flex justify-center items-center">
            <Header title="Settings"></Header>

            <Button className="rounded-lg bg-gray-100 p-3 w-4/5 text-center"> Foto de perfil </Button>

            <Button className="rounded-lg bg-gray-100 p-3 w-4/5 text-center"> Dato del usuario </Button>

            <Button className="rounded-lg bg-gray-100 p-3 w-4/5 text-center"> Acerca de la app </Button>

            <Footer />
        </main>
    )
}