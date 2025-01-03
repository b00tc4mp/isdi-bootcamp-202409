import './Footer.css'
import { Button } from '../library'
import { useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import logic from '../../../logic'

function Footer({ onHomeClick, onNewPostClick, onProfileClick }) {
  const { userId } = useParams()
  const location = useLocation()
  const [currentUserId, setCurrentUserId] = useState(null)

  useEffect(() => {
    if (userId) {
      setCurrentUserId(userId)
    }
  }, [userId])

  return (

    <footer className="Footer">

      {(location.pathname === '/' ||
        location.pathname === '/new-post' ||
        location.pathname === `/profile/${currentUserId}`) &&
        <i onClick={onHomeClick} className="fa-solid fa-house"></i>}

      {(location.pathname === '/' ||
        location.pathname === `/profile/${currentUserId}`) &&
        <Button onClick={onNewPostClick} id="btn-post">
          <i className="fa-solid fa-plus"></i>
        </Button>}

      {(location.pathname === '/' ||
        location.pathname === '/new-post' ||
        location.pathname === `/profile/${currentUserId}`
      ) &&
        <i onClick={onProfileClick} className="fa-solid fa-user"></i>}

    </footer>
  )
}

export default Footer