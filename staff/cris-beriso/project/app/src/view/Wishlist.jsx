import { useState, useEffect } from 'react'

import Product from './components/Product'

import logic from '../logic'

export default function Wishlist({ onProductDetails }) {
  const [wishlist, setWishlist] = useState([])
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
      key={product.id}
      product={product}
      onProductDetails={onProductDetails}
    // onLiked={handleLiked}
    // onDisliked={handleDisliked}
    // onSaved={handleSaved}
    // onCommentAdded={handleCommentAdded}
    // onCommentRemoved={handleCommentRemoved}
    />)}
  </div>
}