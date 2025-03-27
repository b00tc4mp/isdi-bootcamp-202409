import './Footer.css'
import { Button } from '../biblio'

function Footer({ onHomeClick, onNewPostClick, view }) {
  return (

    <footer className="Footer">
      {view === 'home' && <i onClick={onHomeClick} className="fa-solid fa-house"></i>}
      {view === 'home' && <Button onClick={onNewPostClick} id="btn-post"><i className="fa-solid fa-plus"></i></Button>}
      {view === 'home' && <i className="fa-solid fa-user"></i>}

    </footer>
  )
}

export default Footer