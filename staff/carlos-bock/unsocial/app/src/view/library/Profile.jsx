import { useParams, Link, Routes, Route } from 'react-router-dom';

import ChangePassword from '../components/ChangePassword.js';
import ChangeEmail from '../components/ChangeEmail.jsx';

export default function Profiles() {
    const { userId } = useParams()

    return <main className="py-16">
        <h2>Profile of user with id</h2>

        <menu className='flex flex-col'>
            <Link to="change-email">Change Email</Link>
            <Link to="change-password">Change Password</Link>
        </menu>

        <Routes>
            <Route path="change-email" element={<ChangeEmail />} />
            <Route path="change-password" element={<ChangePassword />} />
        </Routes>
    </main>
}

