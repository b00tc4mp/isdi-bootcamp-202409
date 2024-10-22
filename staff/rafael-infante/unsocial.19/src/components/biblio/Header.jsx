import Logo from '../../images/users-avatar.png'
function Header() {
  return (
    <header className="logo-container">
      <img className="logo" src={Logo} />
      <h1>unSocial</h1>
    </header>
  )
}

export default Header