


import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'
import { Login, Register, HomePage, ExpensePage, ExpenseListPage } from './view'
import { Header, Alert, Confirm } from './view/components'
import { Context } from './view/useContext'
import logic from './logic'

export default function App() {
  const [alert, setAlert] = useState({
    message: null,
    level: 'error'
  })

  const [confirm, setConfirm] = useState({
    message: null,
    level: 'error',
    callback: null
  })

  const navigate = useNavigate()
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  const handleUserLoggedOut = () => navigate('/login')

  const handleLoginClick = () => navigate('/login')

  const handleUserRegistered = () => navigate('/login')

  const handleUserLoggedIn = () => navigate('/')

  const handleRegisterClick = () => navigate('/register')

  const handleExpenseListClick = () => navigate('/expenseList')

  const handleExpensePageClick = () => navigate('/expenses')

  const handleAlertAccepted = () => setAlert({
    message: null,
    level: 'error'
  })

  const handleConfirmCancelled = () => {
    confirm.callback(false)

    setConfirm({
      message: null,
      level: 'error',
      callback: null
    })
  }

  console.log('App -> render')

  return (
    <Context.Provider value={{
      alert(message, level = 'error') { setAlert({ message, level }) },
      confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }) }
    }}>
      {!isLoginPage && <Header onLoggedOut={handleUserLoggedOut} />}

      <Routes>
        <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />
        <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />
        <Route path="/" element={logic.isUserLoggedIn() ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/expenses" element={logic.isUserLoggedIn() ? <ExpensePage onExpensePageButtonClick={handleExpenseListClick} /> : <Navigate to="/login" />} />
        <Route path="/expenseList" element={logic.isUserLoggedIn() ? <ExpenseListPage onExpensePageButtonClick={handleExpensePageClick} /> : <Navigate to="/login" />} />
      </Routes>

      {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}
      {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
    </Context.Provider>
  )
}