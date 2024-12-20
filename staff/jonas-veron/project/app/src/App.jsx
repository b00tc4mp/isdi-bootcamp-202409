import { useState } from "react"

import { Routes, Route, useNavigate, Navigate } from "react-router-dom"

import { Context } from "./view/useContext.js"

import logic from "./logic/index.js"

import {
  Login,
  Register,
  Home,
  CreateEvent,
  FavoritEvents,
  FilteredEvents,
  EventsCalendar,
  NearbyEvents,
  Settings,
} from "./view/index.js"
import {
  Header,
  Footer,
  Alert,
  Confirm,
} from "./view/Components/functional/index.js"

export default function App() {
  const [alert, setAlert] = useState({
    message: null,
    level: "error",
  })

  const [confirm, setConfirm] = useState({
    message: null,
    level: "error",
    callback: null,
  })

  const navigate = useNavigate()
  const isLoggedIn = logic.isUserLoggedIn()
  const isOrganizer = logic.isUserRoleOrganizer()

  const handleAlertAccepted = () =>
    setAlert({
      message: null,
      level: "error",
    })

  const handleConfirmAccepted = () => {
    confirm.callback(true)

    setConfirm({
      message: null,
      level: "error",
      callback: null,
    })
  }

  const handleConfirmCancelled = () => {
    confirm.callback(false)

    setConfirm({
      message: null,
      level: "error",
      callback: null,
    })
  }

  return (
    <Context.Provider
      value={{
        alert(message, level = "error") {
          setAlert({ message, level })
        },
        confirm(message, callback, level = "error") {
          setConfirm({ message, callback, level })
        },
      }}
    >
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
          element={isOrganizer ? <CreateEvent /> : <Navigate to="/" />}
        />

        <Route
          path="/favorites"
          element={isLoggedIn ? <FavoritEvents /> : <Navigate to="/login" />}
        />
        <Route
          path="/events/:type"
          element={isLoggedIn ? <FilteredEvents /> : <Navigate to="/login" />}
        />
        <Route
          path="/calendar"
          element={isLoggedIn ? <EventsCalendar /> : <Navigate to="/login" />}
        />
        <Route
          path="/nearbyevents"
          element={isLoggedIn ? <NearbyEvents /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={isLoggedIn ? <Settings /> : <Navigate to="/login" />}
        />
      </Routes>

      {isLoggedIn && <Footer />}

      {alert.message && (
        <Alert
          message={alert.message}
          level={alert.level}
          onAccepted={handleAlertAccepted}
        />
      )}

      {confirm.message && (
        <Confirm
          message={confirm.message}
          level={confirm.level}
          onAccepted={handleConfirmAccepted}
          onCancelled={handleConfirmCancelled}
        />
      )}
    </Context.Provider>
  )
}
