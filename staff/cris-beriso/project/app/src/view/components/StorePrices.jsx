import { useState, useEffect } from 'react'
import logic from '../../logic'
import OneStorePrice from './OneStorePrice'

export default function StorePrices({ productId }) {
  const [storePrices, setStorePrices] = useState([])
  const [center, setCenter] = useState(null)

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

    const userConsent = window.confirm('Share location?')
    if (userConsent) {
      try {
        logic.getUserLocation()
          .then((ubication) => setCenter(ubication)
          )
      } catch (error) {
        alert(error.message)

        console.error(error)
      }
    }
  }, [])

  return <div>
    {storePrices.map(storePrice =>
      <OneStorePrice
        key={storePrice.id}
        productId={productId}
        storePrices={storePrice}
        center={center}
      />
    )}
  </div>
}