import { useLocation } from 'react-router-dom'

import { Button } from '../library'

export default function Footer({ onWishlist }) {
  const location = useLocation()

  return <footer>
    <Button type="button" onClick={onWishlist}>Wishlist</Button>
  </footer>
}

