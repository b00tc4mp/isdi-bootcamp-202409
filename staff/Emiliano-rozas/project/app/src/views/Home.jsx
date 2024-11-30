import React from 'react'
import Hero from '../components/Hero.jsx'
import LatestArrivals from '../components/LatestArrivals.jsx'
import BestSeller from '../components/BestSeller.jsx'
import Policy from '../components/Policy.jsx'
import Newsletter from '../components/Newsletter.jsx'

const Home = () => {
    return (
        <div >
            <Hero />
            <LatestArrivals />
            <BestSeller />
            <Policy />
            <Newsletter />
        </div>
    )
}

export default Home