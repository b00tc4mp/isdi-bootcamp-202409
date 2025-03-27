import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '../library'
import logic from '../../../logic'
import './Header.css'
import Logo from '../../images/users-avatar.png'
import useContext from '../../useContext'

export default function Header({ onHomeClick, onLoggedOut }) {
  const [name, setName] = useState(null)

  const location = useLocation()

  const { alert, confirm } = useContext()

  useEffect(() => {
    console.log('Header -> render componentDidMount & componentWillReceiveProps')
    if (logic.isUserLoggedIn()) {
      if (!name)
        try {
          logic
            .getUserName()
            .then(setName)
            .catch((error) => {
              alert(error.message)

              console.error(error)
            })
        } catch (error) {
          alert(error.message)

          console.error(error)
        }
    } else setName(null)
  }, [location.pathname])

  const handleLogout = (event) => {
    confirm(
      'Logout?',
      (accepted) => {
        if (accepted) {
          event.preventDefault()
          onLoggedOut()
        }
      },
      'warn'
    )
    // if (confirm('Logout?')) {
    //   event.preventDefault()
    //   onLoggedOut()
    // }
  }

  const handleHomeClick = (event) => {
    event.preventDefault()
    onHomeClick()
  }

  console.log('Header -> render')

  return (
    <header className="Header flex items-center justify-between">
      <div
        onClick={logic.isUserLoggedIn() ? handleHomeClick : () => {}}
        className={logic.isUserLoggedIn() ? 'logo-container-btn' : 'logo-container'}
      >
        <img className="logo" src={Logo} />
        <h1>unSocial</h1>
      </div>
      {name && <h3>{name}</h3>}
      {logic.isUserLoggedIn() && logic.getUserRole() === 'moderator' && <p>💀</p>}
      {logic.isUserLoggedIn() && logic.getUserRole() === 'regular' && <p>🎃</p>}

      {logic.isUserLoggedIn() && (
        <Button id="btn-logout" type="button" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </header>
  )
}
