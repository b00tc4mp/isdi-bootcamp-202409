import { useParams, Link, Route, Routes } from 'react-router-dom'

import { ChangeName, ChangeNickname, ChangePassword } from './components'

export default function Profile() {
    const { userId } = useParams()

    return <main className="py-16">
        <h2>{userId} profile</h2>

        <menu className="flex flex-col">
            <Link to="change-name">Change Name</Link>
            <Link to="change-nickname">Change Nickname</Link>
            <Link to="change-password">Change Password</Link>
        </menu>
        <Routes>
            <Route path="change-name" element={<ChangeName />} />
            <Route path="change-nickname" element={<ChangeNickname />} />
            <Route path="change-password" element={<ChangePassword />} />
        </Routes>
    </main>
}

