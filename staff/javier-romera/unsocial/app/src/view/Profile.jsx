import { useParams, Link, Routes, Route } from 'react-router-dom'

import ChangePassword from './components/ChangePassword'
import ChangeEmail from './components/ChangeEmail'

export default function Profile() {
    const { userId } = useParams()

    return <main className="h-full w-full py-16">
        <h2 className="text-xs">Profile of user with id {userId}</h2>

        <menu className="flex flex-col py-8">
            <Link to="change-email">Change e-mail</Link>
            <Link to="change-password">Change Password</Link>
        </menu>

        <Routes>
            <Route path="change-email" element={<ChangeEmail />}></Route>
            <Route path="change-password" element={<ChangePassword />}></Route>
        </Routes>
    </main>
}