import { useParams, Link, Routes, Route } from 'react-router-dom'

//add options to change password and email

export default function Profile() {
    const { userId } = useParams()

    return <main className='py-16'>
        <h2>Perfil de usuario con id {userId}</h2>
        <menu className='flex flex-col'>
            { }
        </menu>

        <Routes>
            <Route />
            <Route />
        </Routes>
    </main>
}