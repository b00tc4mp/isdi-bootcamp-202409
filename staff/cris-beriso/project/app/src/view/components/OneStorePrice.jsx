import { useEffect, useState } from 'react'
import logic from '../../logic'
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

      const [latitude, longitude] = item.location.coord
      const distance = calculateDistance(center, [latitude, longitude])
      console.log(distance)
      return distance <= radius
    })
    setFilteredLocations(filtered)
  }

  return <section>
    <p>{name}: {price}€</p>
    <Link to={web} target='blank'>{web}</Link>
    <Button onClick={handleShowDirections}>Show locations</Button>
    {filteredLocations.map((item, index) =>
      <div key={index}>
        {item.location.coord && (
          <p>{item.address}</p>
        )}
      </div>
    )}
  </section>
}