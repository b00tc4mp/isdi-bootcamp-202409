import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../library'
import { calculateDistance } from '../../util'

export default function OneStorePrice({ center, storePrices: { price, store: { name, web, locations } } }) {
  const [filteredLocations, setFilteredLocations] = useState([])

  const handleShowDirections = () => {
    const radius = 1.5

    const filtered = locations.filter(item => {
      if (!item.location) {
        return false
      }

      const [latitude, longitude] = item.location.coordinates
      const distance = calculateDistance(center, [latitude, longitude])
      console.log(distance)
      return distance <= radius
    })
    setFilteredLocations(filtered)
  }

  return <section className="grid shadow-lg">
    <p className="font-semibold">{name} - {price}€</p>
    <Link to={web} target='blank'>{web}</Link>
    <button onClick={handleShowDirections}><img className="w-5" src="/images/button-locations.png" /></button>

    {filteredLocations.map((item, index) =>
      <ul className="list-disc pl-4" key={index}>
        {item.location.coordinates && (
          <li>{item.address}</li>
        )}
      </ul>
    )}
  </section>
}