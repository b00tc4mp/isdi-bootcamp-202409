import { useParams } from "react-router-dom";

export default function Hello() {
    console.log('hello -> render')

    const { name } = useParams()

    return <main className="w-full p-5 flex-1 box-border">
        <h1 className="Header fixed top-0 w-full z-10 bg-[rgba(220,215,215,0.9)] p-4 h-[6%] box-border flex justify-between items-center">Hello,{name}!</h1>
    </main>
}