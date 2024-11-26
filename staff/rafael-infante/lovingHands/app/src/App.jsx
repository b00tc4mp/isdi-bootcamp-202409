import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Login, Home, Register } from './view'
import { Header, Footer } from './view/components'

function App() {
  console.log('App -> render')
  return (
    <>
      <Header />
      <br />
      <Login />
      <br />
      <Register />
      <br />
      <Home />
      <br />
      <Footer />
    </>
  )
}

export default App
