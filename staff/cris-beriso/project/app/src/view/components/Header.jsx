import { useState, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

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

  return <header className="p-4 h-12 box-border flex justify-between items-center fixed top-0 w-full">
    <img src="logo profile" />

    <p>Search</p>

    {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
  </header>
}