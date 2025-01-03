import './Footer.css'
import logic from '../../logic'
import { Button } from '../biblio'

function Footer({ onHomeClick, onNewPostClick }) {
  return (

    <footer className="Footer">
      {logic.isUserLoggedIn() && <i onClick={onHomeClick} className="fa-solid fa-house"></i>}
      {logic.isUserLoggedIn() && <Button onClick={onNewPostClick} id="btn-post"><i className="fa-solid fa-plus"></i></Button>}
      {logic.isUserLoggedIn() && <i className="fa-solid fa-user"></i>}

    </footer>
  )
}

export default Footer