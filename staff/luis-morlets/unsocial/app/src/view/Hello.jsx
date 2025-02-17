import { useParams } from 'react-router-dom'

export default function Hello() {
    console.log('Hello -> render')

    const { name } = useParams()

    return <main style={{ margin: '0 4rem', fontSize: 'x-small' }}>
        <h1>Hello, {name}!</h1>
    </main>
}