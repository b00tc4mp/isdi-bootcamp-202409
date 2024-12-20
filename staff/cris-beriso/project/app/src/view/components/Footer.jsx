import { useLocation } from 'react-router-dom'

import { Button } from '../library'

import logic from '../../logic'

export default function Footer({ onWishlist }) {
  const location = useLocation()

  const hiddenWishlistPaths = ['/wishlist']

  return <footer className={location.pathname === '/login' || location.pathname === '/register' ? " h-12 box-border flex justify-center items-center fixed bottom-0 w-full p-2" : ' h-12 box-border flex justify-center items-center fixed bottom-0 w-full p-2 bg-box'}>
    {logic.isUserLoggedIn() && !hiddenWishlistPaths.includes(location.pathname) && (<Button type="button" onClick={onWishlist}>Wishlist</Button>)}
  </footer>
}

