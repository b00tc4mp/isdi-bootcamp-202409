import { useParams, Link, Routes, Route } from "react-router-dom";
import './Profile.css'


export default function Profile() {
  const { userId } = useParams()

  return (
    <main className="Profile py-16 flex items-center justify-center flex-col h-full bg-white">
      <h2>Profile user with id {userId}</h2>

      <menu>
        <Link to="change-email">Change e-mail</Link>
        <Link to="change-password">Change password</Link>
      </menu>

      {/* <Routes>
        <Route path="change-email" element={<ChangeEmail />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Routes> */}
    </main>
  )
}