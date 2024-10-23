import './Footer.css'
import logic from '../../logic'
import { Button } from '../biblio'

function Footer({ onHomeClick, onNewPostClick }) {
  return (

    <footer className="Footer">
      {logic.isUserLoggedIn() && <i onClick={onHomeClick} class="fa-solid fa-house"></i>}
      {logic.isUserLoggedIn() && <Button onClick={onNewPostClick} id="btn-post"><i class="fa-solid fa-plus"></i></Button>}
      {logic.isUserLoggedIn() && <i class="fa-solid fa-user"></i>}

    </footer>
  )
}

export default Footer