import React from 'react'
import { Hero, LatestArrivals, BestSeller, Policy, Newsletter } from '../components/index.js'

export default function Home() {

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
