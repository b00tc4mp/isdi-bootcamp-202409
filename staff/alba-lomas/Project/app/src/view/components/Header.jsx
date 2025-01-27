


import { useState } from "react"
import { Button } from '../library'
import { HamburguerMenu } from "./HamburguerMenu"
import logic from '../../logic'
import logoProject from '../../assets/logoProject.png'

export default function Header({ onLoggedOut }) {
    const handleLogout = () => {
        if (confirm('Logout')) {
            logic.logoutUser()

            onLoggedOut()
        }
    }

    console.log('Header -> render')

    return (
        <header className="bg-[var(--back-color)] p-4 mt-2 h-16 box-border flex items-center fixed top-3 w-full justify-between z-10">
            <HamburguerMenu />

            <div className="flex justify-center items-center container mx-auto">
                <img src={logoProject} alt='profile' className="w-10 h-10" />
                <h1 className="m-0 text-3xl">costelier</h1>
            </div>

            {logic.isUserLoggedIn() && (
                <Button
                    type="button"
                    onClick={handleLogout}
                    className="bg-red-500 text-white rounded-lg p-2 hover:bg-red-600"
                >
                    cerrar sesion
                </Button>
            )}
        </header>
    )
}
