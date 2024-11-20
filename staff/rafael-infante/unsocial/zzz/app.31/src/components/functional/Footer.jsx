import './Footer.css'
import { Button } from '../biblio'

function Footer({ onHomeClick, onNewPostClick, view }) {
  return (

    <footer className="Footer">
      {view === 'posts' && <i onClick={onHomeClick} className="fa-solid fa-house"></i>}
      {view === 'posts' && <Button onClick={onNewPostClick} id="btn-post"><i className="fa-solid fa-plus"></i></Button>}
      {view === 'posts' && <i className="fa-solid fa-user"></i>}

    </footer>
  )
}

export default Footer