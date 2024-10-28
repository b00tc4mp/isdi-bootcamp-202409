import { Button } from '../library'

import logic from '../../logic'

import './Header.css'

export default ({ view, onHomeClick, onLoggedOut, onProfile }) => {
  console.log('Header -> render')
  let name

  if (logic.isUserLoggedIn())
    try {
      name = logic.getUserName()
    } catch (error) {
      alert(error.message)

      console.error(error)
    }

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
    event.preventDefault()

    onProfile()
  }

  return <header className='Header'>
    <h1>{view === 'new-post' ? <a href="" onClick={handleHomeClick}>Unsocial</a> : 'Unsocial'}</h1>

    {logic.isUserLoggedIn() && <h3><a href="" onClick={handleProfileClick}>{name}</a></h3>}

    {logic.isUserLoggedIn() && <Button type="button" onClick={handleLogout}>Logout</Button>}
  </header>
}