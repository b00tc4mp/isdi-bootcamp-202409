import React from 'react'
import Hero from '../components/Hero.jsx'
import LatestArrivals from '../components/LatestArrivals.jsx'
import BestSeller from '../components/BestSeller.jsx'

const Home = () => {
    return (
        <div >
            <Hero />
            <LatestArrivals />
            <BestSeller />
        </div>
    )
}

export default Home