import Logo from '../../images/users-avatar.png'
import './Header.css'

function Header() {
  return (
    <header className="Header">
      <div className='logo-container'>
        <img className="logo" src={Logo} />
        <h1>unSocial</h1>
      </div>

    </header>
  )
}

export default Header