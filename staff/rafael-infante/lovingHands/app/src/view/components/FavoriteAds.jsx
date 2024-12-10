import Ad from './functional/Ad.jsx'
import logic from '../../logic/index.js'
import { useState, useEffect } from 'react'

export default function FavoriteAds() {
  console.log('Favorites - > render')
  const [favoriteAds, setFavoriteAds] = useState([])

  const refreshFavoriteAds = () => {
    try {
    } catch (error) {}
  }

  return (
    <div>
      <h1>My Favorites</h1>
      {favoriteAds.length === 0 ? (
        <div>
          <p>You don't have any favorites</p>
        </div>
      ) : (
        <div>
          {favoriteAds.map((ad) => (
            <Ad key={ad.id} ad={ad} refreshAds={refreshFavoriteAds} />
          ))}
        </div>
      )}
    </div>
  )
}
