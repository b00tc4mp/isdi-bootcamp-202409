import Logo from '../../images/users-avatar.png'
import './Header.css'

function Header() {
  return (
    <header className="Header">
      <img className="logo" src={Logo} />
      <h1>unSocial</h1>
    </header>
  )
}

export default Header