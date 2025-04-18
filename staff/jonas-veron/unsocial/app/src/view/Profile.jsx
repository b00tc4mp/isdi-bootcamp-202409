import { useParams, Link, Routes, Route } from "react-router-dom";

import ChangePassword from "./../components/functional/ChangePassword";
import ChangeEmail from "./../components/functional/ChangeEmail";

export default function Profile() {
  const { userId } = useParams();

  return (
    <main className="py-16">
      <h2>Profile of user with id {userId}</h2>

      <menu className="flex flex-col">
        <Link to="change-email">Change e-mail</Link>
        <Link to="change-password">Change password</Link>
      </menu>

      <Routes>
        <Route path="change-email" element={<ChangeEmail />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Routes>
    </main>
  );
}
