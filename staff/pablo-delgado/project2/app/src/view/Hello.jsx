import { useParams } from 'react-router-dom'

export default function Hello() {
    console.log('Hello -> render')

    const { name } = useParams()

    return <main className="py-20">
        <h1>Hello, {name}!</h1>
    </main>
}