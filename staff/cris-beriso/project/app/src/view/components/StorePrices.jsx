import { useState, useEffect } from 'react'
import logic from '../../logic'
import OneStorePrice from './OneStorePrice'

export default function StorePrices({ productId }) {
  const [storePrices, setStorePrices] = useState([])

  useEffect(() => {
    try {
      logic.getStorePrices(productId)
        .then(setStorePrices)
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
    {storePrices.map(storePrice =>
      <OneStorePrice
        key={storePrices.id}
        productId={productId}
        storePrices={storePrice}
      />
    )}
  </div>
}