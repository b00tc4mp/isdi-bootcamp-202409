import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Header() {

    console.log('Header -> render')

    return <header>
        <h1 className="m-0 text-3xl">Hourify</h1>

        {<h3 className="text-2xl">The first tracker time app for everyone</h3>}

    </header>
}