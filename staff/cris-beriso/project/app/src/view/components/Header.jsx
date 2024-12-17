import { useState, useEffect } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { Button } from '../library'

import logic from '../../logic'

import useContext from '../useContext'

export default function Header({ onLoggedOut }) {
  const location = useLocation()

  const { alert, confirm } = useContext()

  const handleLogout = () => {
    confirm('Logout?', accepted => {
      if (accepted) {
        logic.logoutUser()

        onLoggedOut()
      }
    }, 'warn')
  }

  return <header className={location.pathname === '/login' || location.pathname === '/register' ? "h-12 box-border flex justify-between items-center fixed top-0 w-full p-2" : 'h-12 box-border flex justify-between items-center fixed top-0 w-full p-2 bg-[var(--box-color)]'}>
    {logic.isUserLoggedIn() && <Link to={`/`}><h2 className="text-4xl">MakeUp Scanner!</h2></Link>}

    {logic.isUserLoggedIn() && <button type="button" onClick={handleLogout} className=""><img src="/images/button-logout.png" /></button>}
  </header>
}