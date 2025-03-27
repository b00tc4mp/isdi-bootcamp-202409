import { useState, useEffect } from 'react'
import { Button } from '../library'
import logic from '../../../logic'
import './Header.css'
import Logo from '../../images/users-avatar.png'

export default function Header({ view, onHomeClick, onLoggedOut }) {
  const [name, setName] = useState(null)

  useEffect(() => {
    console.log('Header -> render componentDidMount & componentWillReceiveProps')
    if (logic.isUserLoggedIn()) {
      if (!name)
        try {
          logic.getUserName((error, name) => {
            if (error) {
              alert(error.message)

              console.error(error)

              return
            }

            setName(name)
          })
        } catch (error) {
          alert(error.message)

          console.error(error)
        }
    } else setName(null)

  }, [view])

  const handleLogout = event => {

    if (confirm('Logout?')) {
      event.preventDefault()
      onLoggedOut()
    }
  }

  const handleHomeClick = event => {

    event.preventDefault()
    onHomeClick()
  }

  console.log('Header -> render')

  return (
    <header className="Header">
      <div
        onClick={logic.isUserLoggedIn() ? handleHomeClick : () => { }}
        className={logic.isUserLoggedIn() ? 'logo-container-btn' : 'logo-container'}>
        <img className="logo" src={Logo} />
        <h1>unSocial</h1>
      </div>

      {name && <h3>{name}</h3>}

      {logic.isUserLoggedIn() && <Button id="btn-logout" type="button" onClick={handleLogout}>Logout</Button>}

    </header>
  )
}