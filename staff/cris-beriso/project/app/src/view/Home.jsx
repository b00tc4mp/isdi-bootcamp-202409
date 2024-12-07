import { useState, useEffect } from 'react'

import Product from './components/Product'

import logic from '../logic'


export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    try {
      logic.getProducts()
        .then(setProducts)
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
    {products.map(product => <Product
      key={product.id}
      product={product}
    // onLiked={handleLiked}
    // onDisliked={handleDisliked}
    // onSaved={handleSaved}
    // onCommentAdded={handleCommentAdded}
    // onCommentRemoved={handleCommentRemoved}
    />)}
  </div>
}