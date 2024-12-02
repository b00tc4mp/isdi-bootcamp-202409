// import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import logic from '../logic'

export default function Home() {
  const { name } = useParams()
  return <div>
    <p>Hola</p>
  </div>
}