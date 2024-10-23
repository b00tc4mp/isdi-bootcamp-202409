import Logo from '../../images/users-avatar.png'
import './Header.css'
import logic from '../../logic'

function Header({ onLoggedOut }) {
  let name
  let username

  if (logic.isUserLoggedIn()) {
    try {
      name = logic.getUserName()
      username = logic.getUserUsername()
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  return (
    <header className="Header">
      <div className='logo-container'>
        <img className="logo" src={Logo} />
        <h1>unSocial</h1>
      </div>

      {logic.isUserLoggedIn() && <h3>{username}</h3>}

      {logic.isUserLoggedIn() && <button id="btn-logout" type="button" onClick={event => {
        event.preventDefault()
        onLoggedOut()
      }}>Logout</button>}

    </header>
  )
}

export default Header