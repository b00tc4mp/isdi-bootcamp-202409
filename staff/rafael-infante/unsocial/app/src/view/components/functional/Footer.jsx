import './Footer.css'
import { Button } from '../library'

function Footer({ onHomeClick, onNewPostClick }) {
  return (

    <footer className="Footer">
      {(location.pathname === '/' || location.pathname === '/new-post') && <i onClick={onHomeClick} className="fa-solid fa-house"></i>}
      {location.pathname === '/' && <Button onClick={onNewPostClick} id="btn-post"><i className="fa-solid fa-plus"></i></Button>}
      {(location.pathname === '/' || location.pathname === '/new-post') && <i className="fa-solid fa-user"></i>}

    </footer>
  )
}

export default Footer