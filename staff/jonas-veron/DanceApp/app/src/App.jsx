import { Routes, Route, useNavigate, Navigate } from "react-router-dom"

import {
  Login,
  Register,
  Home,
  CreateEvent,
  FavoritEvents,
  FilteredEvents,
} from "./view/index.js"
import { Header, Footer } from "./view/Components/functional/index.js"

import logic from "./logic/index.js"

function App() {
  const navigate = useNavigate()
  const isLoggedIn = logic.isUserLoggedIn()
  console.log("App -> render")

  return (
    <>
      {isLoggedIn && <Header />}

      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/createEvent"
          element={isLoggedIn ? <CreateEvent /> : <Navigate to="/login" />}
        />

        <Route
          path="/favorites"
          element={isLoggedIn ? <FavoritEvents /> : <Navigate to="/login" />}
        />
        <Route
          path="/events/:eventType"
          element={isLoggedIn ? <FilteredEvents /> : <Navigate to="/login" />}
        />
      </Routes>

      {isLoggedIn && <Footer />}
    </>
  )
}

export default App
