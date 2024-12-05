import { useState, useEffect } from 'react'

import { Product } from './components'

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

  const handleCommentAdded = () => {
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
  }

  const handleCommentRemoved = () => {
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
  }

  return <div>
    {products.map(product => <Product
      key={product.id}
      product={product}
      onCommentAdded={handleCommentAdded}
      onCommentRemoved={handleCommentRemoved}
    />)}
  </div>
}