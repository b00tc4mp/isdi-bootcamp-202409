import { useState, useEffect } from 'react'

import Product from './components/Product'

import logic from '../logic'

export default function Wishlist() {
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



  return <main className="bg-back  flex flex-col items-center pt-5">
    < h2 className="text-3xl pt-10" > Wishlist </h2 >
    <ul className="grid gap-y-2 pt-2 pb-14">
      {wishlist.length > 0 ? (
        wishlist.map(product => (
          <Product
            key={product.id}
            product={product}
          />
        ))
      ) : (
        <p className="pt-10">Your wishlist is empty!</p>
      )}
    </ul>
  </main>
}