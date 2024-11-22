import { useState, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { Button } from '../library'

import logic from '../../logic'

import './Header.css'

export default function Header({ onLoggedOut }) {
    const handleLogout = () => {
        if (confirm('Logout?')) {
            logic.logoutUser()

            onLoggedOut()
        }
    }

    console.log('Header -> render')

    return <header className="Header">
        <h1>OMG aka WTF</h1>

        {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
    </header>
}