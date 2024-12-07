import { useState, useEffect } from 'react'

import Product from './components/Product'

import logic from '../logic'

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([])
  console.log(wishlist)
  console.log('hola')
  useEffect(() => {
    try {
      logic.getWishlist()
        .then(setWishlist)
        .catch(error => {
          alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }, [])



  return <div>
    {wishlist.map(product => <Product
      product={product}
    // onLiked={handleLiked}
    // onDisliked={handleDisliked}
    // onSaved={handleSaved}
    // onCommentAdded={handleCommentAdded}
    // onCommentRemoved={handleCommentRemoved}
    />)}
  </div>
}