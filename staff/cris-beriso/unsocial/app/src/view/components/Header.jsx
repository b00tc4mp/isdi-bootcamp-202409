import { useState, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { Button } from '../library'

import logic from '../../logic'

import './Header.css'

export default function Header({ onHomeClick, onLoggedOut }) {
  const [name, setName] = useState(null)

  const location = useLocation()

  useEffect(() => {
    console.log('Header -> componentDidMount & componentWillReceiveProps')

    if (logic.isUserLoggedIn()) {
      if (!name)
        try {
          logic.getUserName()
            .then(setName)
            .catch(error => {
              alert(error.message)

              console.error(error)
            })
        } catch (error) {
          alert(error.message)

          console.error(error)
        }
    } else setName(null)
  }, [location.pathname])

  const handleHomeClick = event => {
    event.preventDefault()

    onHomeClick()
  }

  const handleLogout = () => {
    if (confirm('Logout?')) {
      logic.logoutUser()

      onLoggedOut()
    }
  }

  const handleProfileClick = event => {
    try {
      event.preventDefault()

      onProfile()
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  console.log('Header -> render')

  return <header className='Header'>
    <h1>{location.pathname === '/new-post' ? <a href="" onClick={handleHomeClick}>Unsocial</a> : 'Unsocial'}</h1>

    {name && <h3><a href="" onClick={handleProfileClick}>{name}</a></h3>}

    {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
  </header>
}