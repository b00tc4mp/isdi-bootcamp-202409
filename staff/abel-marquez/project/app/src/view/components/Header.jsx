import { Button } from "../library"

export default function Header({ title, ArrowBack, onBack }) {
    return (
        <header className="p-4 bg-white shadow-md flex justify-center mt-4">
            { ArrowBack && ( <Button onClick={onBack}> 🔙 </Button> ) }

            <h1 className="text-2x1 font-bold">{title}</h1>
        </header>
    )
}