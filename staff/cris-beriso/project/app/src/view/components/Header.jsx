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
    <img src="https://i.pinimg.com/564x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg" className='w-8 h-8' />

    {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
  </header>
}