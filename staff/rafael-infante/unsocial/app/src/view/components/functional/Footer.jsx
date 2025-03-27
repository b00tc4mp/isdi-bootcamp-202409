import './Footer.css'
import { Button } from '../library'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Footer({ onHomeClick, onNewPostClick, onProfileClick }) {
  const location = useLocation()
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    // Extraer manualmente el userId de la URL
    const match = location.pathname.match(/^\/profile\/([^/]+)$/)
    if (match) {
      setUserId(match[1]) // userId es la primera captura del regex
    } else {
      setUserId(null) // No estamos en una ruta con userId
    }
  }, [location.pathname])

  return (
    <footer className="Footer">
      {(location.pathname === '/' ||
        location.pathname === '/new-post' ||
        location.pathname === `/profile/${userId}`) && (
          <i onClick={onHomeClick} className="fa-solid fa-house"></i>
        )}

      {location.pathname === '/' && (
        <Button onClick={onNewPostClick} id="btn-post">
          <i className="fa-solid fa-plus"></i>
        </Button>
      )}

      {(location.pathname === '/' ||
        location.pathname === '/new-post' ||
        location.pathname === `/profile/${userId}`) && (
          <i onClick={onProfileClick} className="fa-solid fa-user"></i>
        )}
    </footer>
  )
}

export default Footer
