import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Login, Home, Register } from './view'
import { Header, Footer } from './view/components'

function App() {
  console.log('App -> render')
  return (
    <>
      <Header />
      <Login />
      {/* <Register />
      <Home /> */}
      <Footer />
    </>
  )
}

export default App
